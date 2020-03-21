const fetchWithTimeout = require('../utils/requests').fetchWithTimeout;

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
async function add_user(username, password, email) {
  data = {'username' : username,
          'password': password,
          'email': email};
  const response = await fetchWithTimeout('/user/create', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
  // Returns a new user object.
  return (await response.json()).user;
};

/**
 * Description: Delete a user into the system.
 *
 * @param  {string} username
 */
async function delete_user(username){
  const response = await fetchWithTimeout('/user/delete?username=' + username, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json'
     },
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
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
  const response = await fetchWithTimeout('/user?username=' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
   })
  if (response.status != 200) {
    throw (await response.json()).message;
  }
  // Returns a user object.
  return (await response.json()).user;
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
  // Returns a list of user objects.
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
 */
async function update_user(user){
  const response = await fetchWithTimeout('/user/update', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(user)
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
};

module.exports = {add_user, delete_user, get_user, get_users, update_user};
