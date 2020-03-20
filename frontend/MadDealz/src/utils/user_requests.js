const fetch = require('node-fetch');

let IP = 'https://api.maddealz.software'

//TODO: encrypt_password, verify_password, add_review
/**
 * Description: Add a user into the system.
 *
 * @param  {string} username
 * @param  {string} password
 * @param  {string} email
 *
 * @return {object} user object containing username, password,
                    location, favorite bars, and friends.
 */
async function add_user(username, password, email){
  let url = IP + '/user/create';
  data = {'username' : username,
          'password': password,
          'email': email};
  const response = await fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
  });
  // Returns a new user object.
  return await response.json();
};

/**
 * Description: Delete a user into the system.
 *
 * @param  {string} username
 *
 * @return {object} user object containing username, password,
                    location, favorite bars, and friends.
 */
async function delete_user(username){
  let url = IP + '/user/delete?username=' + username;
  const response = await fetch(url, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json'
     },
  });
  // Returns a new user object.
  return await response.json();
};

/**
 * Description: Get a user from the system.
 *
 * @param  {string} username
 *
 * @return {object} user object containing username, password,
                    location, favorite bars, and friends.
 */
async function get_user(username){
  let url = IP + '/user?username=' + username;
  const response = await fetch(url, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json'
     },
  });
  // Returns a new user object.
  return await response.json();
};

/**
 * Description: Get a user from the system.
 *
 * @param  {list of strings} usernames
 *
 * @return {list of object} list of user objects containing username, password,
 *                          location, favorite bars, and friends.
 */
async function get_users(usernames){
  let users = [];
  for (let i = 0; i < usernames.length; i++) {
      users.push(await get_user(usernames[i]));
  }
  // Returns a new user object.
  return users;
};

/**
 * Description: Update a user in the system.
 *
 * @param {object} user
 *   @subparam   {string} username
 *   @subpparam  {string} first_name (optional)
 *   @subpparam  {string} last_name  (optional)
 *   @subpparam  {string} email      (optional)
 *   @subpparam  {string} password   (optional)
 *   @subpparam  {string} favorites  (optional)
 *   @subpparam  {string} friends    (optional)
 *   @subpparam  {string} comments   (optional)
 *   @subpparam  {string} bars_owned (optional)
 *
 * @return {object} user object containing username, password,
                    location, favorite bars, and friends.
 */
async function update_user(user){
  let url = IP + '/user/update';
  const response = await fetch(url, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(user)
  });
  // Returns a new user object.
  return await response.json();
};


////////////////////////////////////// TESTS //////////////////////////////////////
async function test_delete_user(username) {
  let response = await delete_user(username);
  console.log(response);
}

async function test_add_user(username, password, email) {
  let user = await add_user(username, password, email);
  console.log(user);
  return user;
}

async function test_get_user(username) {
  let user = await get_user(username);
  console.log(user);
  return user;
}

async function test_get_users(usernames) {
  let users = await get_users(usernames);
  console.log(users);
  return users;
}

async function test_update_user(user) {
  user = await update_user(user);
  console.log(user);
  return user;
}

async function test_suite() {
  await test_delete_user('test');
  await test_add_user('test', 'user', 'fake@gmail.com');
  await test_get_user('test');
  await test_get_users(['test']);
  await test_update_user({'username': 'test', 'password': 'new_user'});
}
test_suite();