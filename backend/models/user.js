const crypto = require('crypto');

import * as db_util from '../db';

//  DB SCHEMA FOR USER OBJECTS

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
        return { status: 400, message: "Email or password is empty" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let result = await dbo.collection('users').findOne({email: user.email});
    if (result != null)
      return { status: 409, message: "User already exists" };
    
    user.password = encryptPass(user.password);

    result = await dbo.collection('users').insertOne(user);
    con.close;

    if (result == null)
      return { status: 500, message: "Error adding user to database" };

    result.ops[0].password = null;
    return { status: 201, message: "User successfully created", user: result.ops[0] };
}

export async function get_user(id) {
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let user = await dbo.collection("users").findOne({ _id: db_util.ObjectId(id) }, {});
  con.close();
  
  if (user == undefined)
    return { status: 404, message: "User not found", user: user};

  user.password = null;
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
  if (user._id == '' || user._id == null) {
    return { status: 400, message: "Must specify a user _id"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);
  
  let values = {};

  for (let key in user) {
    if (user[key] != '' && key != '_id') {
      if (key == 'password')
        user[key] = encryptPass(user.password);
      values[key] = user[key];
    }
  }
  delete values._id;

  const query = { _id: db_util.ObjectId(user._id) };
  let result = await dbo.collection("users").updateOne(query, { $set: values}, { upsert: true });
  con.close();

  console.log(result);

  if (result.matchedCont == 0)
    return { status: 500, message: "User not found"};

  if (result.modifiedCount == 0 && result.matchedCont == 1)
    return { status: 200, message: "Nothing to update"};

  return { status: 200, message: "User updated successfully"};
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
  if (hash === passwordFields[1]) {
    return true;
  }
  return false;
}