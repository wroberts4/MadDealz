const fetch = require('node-fetch');

let IP = 'http://104.187.156.165:4000'

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
  var url = IP + '/user/create';
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
  var url = IP + '/user/delete?username=' + username;
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
  var url = IP + '/user?username=' + username;
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
  var url = IP + '/user/update';
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
async function test_delete_username(username) {
  let response = await delete_user(username);
  console.log(response);
}

async function test_add_username(username, password, email) {
  let user = await add_user(username, password, email);
  console.log(user);
  return user;
}

async function test_get_username(username) {
  let user = await get_user(username);
  console.log(user);
  return user;
}

async function test_update_username(user) {
  user = await update_user(user);
  console.log(user);
  return user;
}

async function test_suite() {
  await test_delete_username('test')
  await test_add_username('test', 'user', 'fake@gmail.com')
  await test_get_username('test')
  await test_update_username({'username': 'test', 'password': 'user'})
}
test_suite()