const fetchWithTimeout = require('../utils/requests').fetchWithTimeout;
const falsy_to_empty = require('../utils/requests').falsy_to_empty;

//TODO: add_review
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
async function add_user(username, password, email, ip, fetch_timeout) {
    username = falsy_to_empty(username);
    password = falsy_to_empty(password);
    email = falsy_to_empty(email);
    data = {username: username, password: password, email: email};
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/create';
    const response = await fetchWithTimeout(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
        fetch_timeout
    );
    if (response.status != 200) {
        throw (await response.json()).message;
    }
    // Returns a new user object.
    return (await response.json()).user;
}

/**
 * Description: Delete a user into the system.
 *
 * @param  {string} username
 */
async function delete_user(username, ip, fetch_timeout) {
    username = falsy_to_empty(username);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/delete?username=' + username;
    const response = await fetchWithTimeout(
        url,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        fetch_timeout
    );
    if (response.status != 200) {
        throw (await response.json()).message;
    }
    return (await response.json()).message;
}

/**
 * Description: Get a user from the system.
 *
 * @param  {string} username
 *
 * @return {object} user object containing username, password,
                    location, favorite bars, and friends.
 */
async function get_user(username, ip, fetch_timeout) {
    username = falsy_to_empty(username);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user?username=' + username;
    const response = await fetchWithTimeout(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        fetch_timeout
    );
    if (response.status != 200) {
        throw (await response.json()).message;
    }
    // Returns a user object.
    return (await response.json()).user;
}

/**
 * Description: Get a user from the system.
 *
 * @param  {list of strings} usernames
 *
 * @return {list of object} list of user objects containing username, password,
 *                          location, favorite bars, and friends.
 */
async function get_users(ip, fetch_timeout) {
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/list';
    const response = await fetchWithTimeout(
        url,
        {
            method: 'GET',
        },
        fetch_timeout
    );
    if (response.status != 200) {
        throw (await response.json()).message;
    }
    // Returns a list of bar objects
    return (await response.json()).users;
}

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
async function update_user(user, ip, fetch_timeout) {
    user = falsy_to_empty(user);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/update';
    const response = await fetchWithTimeout(
        url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        },
        fetch_timeout
    );
    if (response.status != 200) {
        throw (await response.json()).message;
    }
    return (await response.json()).message;
}

async function user_login(user, ip, fetch_timeout) {
    user = falsy_to_empty(user);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/login';
    const response = await fetchWithTimeout(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        },
        fetch_timeout
    );
    if (response.status != 200) {
        throw (await response.json()).message;
    }
    // Returns a user object.
    return (await response.json()).user;
}

async function add_favorite_bar(username, bar_id) {}

async function remove_favorite_bar(username, bar_id) {}

async function add_favorite_deal(username, deal_id) {}

async function remove_favorite_deal(username, deal_id) {}

async function send_friend_request(requester, requestee) {}

async function accept_friend_request(requester, requestee) {}

async function remove_friend(user1, user2) {}

module.exports = {
    add_user,
    delete_user,
    get_user,
    get_users,
    update_user,
    user_login,
    add_favorite_bar,
    remove_favorite_bar,
    add_favorite_deal,
    remove_favorite_deal,
    send_friend_request,
    accept_friend_request,
    remove_friend,
};
