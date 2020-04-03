const crypto = require('crypto');
import { convert_to_object } from '../utils/convert_to_object.js'
import * as db_util from '../db';

//  DB SCHEMA FOR USER OBJECTS

//     _id: String,
//     first_name: String,
//     last_name: String,
//     email: String,
//     username: String,
//     password: String,
//     favorites: {
//         bars: [String],
//         deals: [String]
//     },
//     friends: [String],
//     friend_requests: {
//         incoming: [String],
//         outgoing: [String]
//     },
//     comments: [String],
//     bars_owned: [String]

export async function create_user(user) {
    user = convert_to_object(user);
    if (!user.password || !user.email || !user.username)
        return { status: 400, message: "Email, password, or username is empty" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let result = await dbo.collection('users').findOne({username: user.username});
    if (result)
      return { status: 409, message: "Username already taken" };

    result = await dbo.collection('users').findOne({email: user.email});
    if (result)
      return { status: 409, message: "Email already in use" };

    user.password = encryptPass(user.password);

    result = await dbo.collection('users').insertOne(user);
    con.close;

    if (!result)
      return { status: 500, message: "Error adding user to database" };

    let user_result = result.ops[0];
	delete user_result.password;
	delete user_result.email;

    return { status: 200, message: "User successfully created", user: user_result };
}

async function _get_user(username) {
  username = convert_to_object(username);
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let user = await dbo.collection("users").findOne({ 'username': username }, {});
  con.close();
  return user;
}

export async function get_user(username) {
  username = convert_to_object(username);
  if (!username) {
    return { status: 400, message: "Must specify a username" };
  }
  let user = await _get_user(username);

  if (!user)
    return { status: 404, message: "User not found", user: user};

  delete user.password;
  delete user.email;
  
  return {status: 200, message: "User successfully retrieved", user: user};
}

export async function get_users() {
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let users = await dbo.collection("users").find({}).toArray();
    con.close();

    if (users.length == 0)
      return { status: 404, message: "No users found", users: users};

    for (let i = 0; i < users.length; i++) {
      delete users[i].password;
      delete users[i].email;
    };

    return {status: 200, message: "Users successfully retrieved", users: users};
}

export async function user_login(user) {
  user = convert_to_object(user);
  if (!user.email || !user.password)
    return { status: 400, message: "No email or password specified"};

  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let result = await dbo.collection("users").findOne({ email: user.email }, {});
  con.close();

  console.log(result);

  if (!result)
    return { status: 404, message: "User does not exist", user: user};
  
  if (!checkPass(user.password, result.password))
    return { status: 401, message: "Incorrect password", user: user};

  delete result.password;
  
  return { status: 200, message: "User authenticated successfully", user: result};
}

export async function update_user(user) {
  user = convert_to_object(user);
// Note: we may want to get the _id from the username for future use?
  if (!user.username) {
    return { status: 400, message: "Must specify a username"};
  } else if ("password" in user) {
    if (!user.password) {
      return { status: 400, message: "Password must not be empty or null" };
    }
    user.password = encryptPass(user.password);
  }

  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let result = await dbo.collection('users').findOne({email: user.email});
  if (result)
    return { status: 409, message: "Email already in use" };
  
  let values = {};

  for (let key in user) {
    if (user[key] && key != '_id') {
      if (user[key]) {
        values[key] = user[key];
      }
    }
  }
  const query = { 'username': user.username };
  result = await dbo.collection("users").updateOne(query, { $set: values}, { upsert: false });
  con.close();

  if (result.matchedCount == 0)
    return { status: 500, message: "User not found"};

  if (result.modifiedCount == 0 && result.matchedCount == 1)
    return { status: 200, message: "Nothing to update"};

  return { status: 200, message: "User updated successfully"};
}

export async function delete_user(username) {
  username = convert_to_object(username);
  if (!username)
    return { status: 400, message: "Must specify a username"};

  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': username };
  let result = await dbo.collection("users").deleteOne(query, {});

  if (result.deletedCount == 0)
    return { status: 500, message: "User not found"};
  
  return { status: 200, message: "User deleted successfully" };
}

export async function add_favorite_bar(username, bar_id) {
  username = convert_to_object(username);
  bar_id = convert_to_object(bar_id);
  if (!username) {
    return { status: 400, message: "Must specify a username"};
  } else if (!bar_id) {
    return { status: 400, message: "Must specify a bar id"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': username };
  let result = await dbo.collection("users").updateOne(query, { $addToSet: { 'favorites.bars': bar_id } }, { upsert: false });
  con.close();

  return { status: 200, message: "Favorite bar added successfully" };
}

export async function remove_favorite_bar(username, bar_id) {
  username = convert_to_object(username);
  bar_id = convert_to_object(bar_id);
  if (!username) {
    return { status: 400, message: "Must specify a username"};
  } else if (!bar_id) {
    return { status: 400, message: "Must specify a bar id"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': username };
  await dbo.collection("users").updateOne(query, { $pull: { 'favorites.bars': bar_id } });

  return { status: 200, message: "Favorite bar removed successfully" };
}

export async function add_favorite_deal(username, deal_id) {
  username = convert_to_object(username);
  deal_id = convert_to_object(deal_id);
  if (!username) {
    return { status: 400, message: "Must specify a username"};
  } else if (!deal_id) {
    return { status: 400, message: "Must specify a deal id"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': username };
  let result = await dbo.collection("users").updateOne(query, { $addToSet: { 'favorites.deals': deal_id } }, { upsert: false });
  con.close();

  return { status: 200, message: "Favorite deal added successfully" };
}

export async function remove_favorite_deal(username, deal_id) {
  username = convert_to_object(username);
  deal_id = convert_to_object(deal_id);
  if (!username) {
    return { status: 400, message: "Must specify a username"};
  } else if (!deal_id) {
    return { status: 400, message: "Must specify a deal id"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': username };
  await dbo.collection("users").updateOne(query, { $pull: { 'favorites.deals': deal_id } });

  return { status: 200, message: "Favorite deal removed successfully" };
}

export async function send_friend_request(requester, requestee) {
  requester = convert_to_object(requester);
  requestee = convert_to_object(requestee);
  if (!requester) {
    return { status: 400, message: "Must specify a requester"};
  } else if (!requestee) {
    return { status: 400, message: "Must specify a requestee"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);
  
  const query = { 'username': requester };
  await dbo.collection("users").updateOne(query, { $addToSet: { 'friend_requests.outgoing': requestee } }, { upsert: false });
  
  const query2 = { 'username': requestee };
  await dbo.collection("users").updateOne(query2, { $addToSet: { 'friend_requests.incoming': requester } }, { upsert: false });
  con.close();

  return { status: 200, message: "Friend request sent successfully" };
}

export async function accept_friend_request(requester, requestee) {
  requester = convert_to_object(requester);
  requestee = convert_to_object(requestee);
  if (!requester) {
    return { status: 400, message: "Must specify a requester"};
  } else if (!requestee) {
    return { status: 400, message: "Must specify a requestee"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': requestee };
  await dbo.collection("users").updateOne(query, { $addToSet: { 'friends': requester } }, { upsert: false });
  await dbo.collection("users").updateOne(query, { $pull: { 'friend_requests.incoming': requester } });

  const query2 = { 'username': requester };
  await dbo.collection("users").updateOne(query2, { $addToSet: { 'friends': requestee } }, { upsert: false });
  await dbo.collection("users").updateOne(query2, { $pull: { 'friend_requests.outgoing': requestee } });
  con.close();

  return { status: 200, message: "Friend request accepted successfully" };
}

export async function remove_friend(user1, user2) {
  user1 = convert_to_object(user1);
  user2 = convert_to_object(user2);
  if (!user1 || !user2) {
    return { status: 400, message: "Must specify two users"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': user1 };
  await dbo.collection("users").updateOne(query, { $pull: { 'friends': user2 } });

  const query2 = { 'username': user2 };
  await dbo.collection("users").updateOne(query2, { $pull: { 'friends': user1 } });
  con.close();

  return { status: 200, message: "Friend removed successfully" };
}

function encryptPass(password) {
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
  password = salt + "$" + hash;
  return password;
}

function checkPass(user_pass, password) {
  let passwordFields = password.split('$');
  let salt = passwordFields[0];
  let hash = crypto.createHmac('sha512', salt).update(user_pass).digest("base64");
  console.log(hash);
  if (hash === passwordFields[1])
    return true;
  return false;
}
