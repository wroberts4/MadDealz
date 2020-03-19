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
 * Description: Get a user from the system.
 *
 * @param  {string} username
 *
 * @return {object} user object containing username, password,
                    location, favorite bars, and friends.
 */
async function update_user(username, first_name=null, last_name=null, email=null,
                           password=null, favorites=null, friends=null, comments=null,
                           bars_owned=null){
  var url = IP + '/user/update';
  let user = {'username': username, 'first_name': first_name, 'last_name': last_name,
              'email': email, 'password': password, 'favorites': favorites, 'friends': friends,
              'comments': comments, 'bars_owned': bars_owned}
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

//async function tmp(username, first_name=null, last_name=null, email=null,
//                   password=null, favorites=null, friends=null, comments=null,
//                   bars_owned=null) {
//  let user = await update_user(username, first_name=first_name, last_name=last_name, email=email,
//                               password=password, favorites=favorites, friends=friends,
//                               comments=comments, bars_owned=bars_owned);
//  console.log(user);
//  return user;
//}
//
//tmp('test', password='user')