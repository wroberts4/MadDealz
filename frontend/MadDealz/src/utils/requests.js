// This is temporary.
let IP = 'http://10.0.2.2:8080'

/**
 * Description: Add a user into the system.
 *
 * @param  {string} username
 * @param  {string} password
 *
 * @return {object} user object containing username, password,
                    location, favorite bars, and friends.
 */
async function add_user(username, password){
  var url = IP + '/user/create';
  data = {'username' : username, 'password': password};
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
 * Description: Get a user from the system.
 *
 * @param  {string} username
 *
 * @return {object} user object containing username, password,
                    location, favorite bars, and friends.
 */
async function add_user(username){
  var url = IP + '/user';
  data = {'username' : username};
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