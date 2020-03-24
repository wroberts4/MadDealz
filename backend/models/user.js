const crypto = require('crypto');

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
//     comments: [String],
//     bars_owned: [String]

export async function create_user(user) {
    if (user.password == null || user.email == null || user.username == null ||  
          user.password == '' || user.email == '' || user.username == '')
        return { status: 400, message: "Email, password, or username is empty" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let result = await dbo.collection('users').findOne({username: user.username});
    if (result != null)
      return { status: 409, message: "Username already taken" };

    result = await dbo.collection('users').findOne({email: user.email});
    if (result != null)
      return { status: 409, message: "Email already in use" };

    result = await dbo.collection('users').findOne({password: user.password});
    if (result != null)
      return { status: 409, message: "password already taken" };
    
    user.password = encryptPass(user.password);

    result = await dbo.collection('users').insertOne(user);
    con.close;

    if (result == null)
      return { status: 500, message: "Error adding user to database" };

		let user_result = result.ops[0];
		delete user_result.password;
		delete user_result.email;

    return { status: 200, message: "User successfully created", user: user_result };
}

async function _get_user(username) {
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let user = await dbo.collection("users").findOne({ 'username': username }, {});
  con.close();
  return user;
}

export async function get_user(username) {
  let user = await _get_user(username);

  if (user == undefined)
    return { status: 404, message: "User not found", user: user};

  delete user.password;
  delete user.email;
  
  return {status: 200, message: "User successfully retrieved", user: user};
}

export async function user_login(user) {
  if (user.email == undefined || user.password == undefined)
    return { status: 400, message: "No email or password specified"};

  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let result = await dbo.collection("users").findOne({ email: user.email }, {});
  con.close();

  console.log(result);

  if (result == null)
    return { status: 404, message: "User does not exist", user: user};
  
  if (!checkPass(user.password, result.password))
    return { status: 401, message: "Incorrect password", user: user};

  result.password = null;
  
  return { status: 200, message: "User authenticated successfully", user: result};
}

export async function update_user(user) {
// Note: we may want to get the _id from the username for future use?
  if (user.username == '' || user.username == null) {
    return { status: 400, message: "Must specify a username"};
  }

  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);
  
  let values = {};

  for (let key in user) {
    if (user[key] != '' && key != '_id') {
      if (key == 'password') {
        if (user[key] == null || user[key] == '')
          return { status: 400, message: "Password must not be empty or null" };
        user[key] = encryptPass(user.password);
      }
      if (user[key] != null) {
        values[key] = user[key];
      }
    }
  }
  const query = { 'username': user.username };
  let result = await dbo.collection("users").updateOne(query, { $set: values}, { upsert: false });
  con.close();

  if (result.matchedCount == 0)
    return { status: 500, message: "User not found"};

  if (result.modifiedCount == 0 && result.matchedCount == 1)
    return { status: 200, message: "Nothing to update"};

  return { status: 200, message: "User updated successfully"};
}

export async function delete_user(username) {
  if (username == '' || username == null)
    return { status: 400, message: "Must specify a username"};

  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': username };
  let result = await dbo.collection("users").deleteOne(query, {});

  if (result.deletedCount == 0)
    return { status: 500, message: "User not found"};
  
  return { status: 200, message: "User deleted successfully" };
}

export async function add_favorite(username, bar_id) {
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': username };
  let result = await dbo.collection("users").updateOne(query, { $addToSet: { 'favorites.bars': bar_id } }, { upsert: false });
  con.close();

  return { status: 200, message: "Favorite added successfully" };
}

export async function remove_favorite(username, bar_id) {
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  const query = { 'username': username };
  await dbo.collection("users").updateOne(query, { $pull: { 'favorites.bars': bar_id } });

  return { status: 200, message: "Favorite removed successfully" };
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
