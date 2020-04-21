const fetchWithTimeout = require('../utils/requests').fetchWithTimeout;
const falsy_to_empty = require('../utils/requests').falsy_to_empty;
const FormData = require('form-data');

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
async function add_user(username, password, email, fetch_timeout, ip) {
    username = falsy_to_empty(username);
    password = falsy_to_empty(password);
    email = falsy_to_empty(email);
    let data = {username: username, password: password, email: email};
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
async function delete_user(username, fetch_timeout, ip) {
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
async function get_user(username, fetch_timeout, ip) {
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
async function get_users(fetch_timeout, ip) {
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
async function update_user(user, fetch_timeout, ip) {
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

async function user_login(email, password, fetch_timeout, ip) {
    email = falsy_to_empty(email);
    password = falsy_to_empty(password);
    let data = {'email': email, 'password': password};
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/login';
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
    // Returns a user object.
    return (await response.json()).user;
}

async function add_favorite_bar(username, bar_id, fetch_timeout, ip) {
    username = falsy_to_empty(username);
    bar_id = falsy_to_empty(bar_id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/add_favorite_bar';
    let data = {'username': username, 'bar_id': bar_id}
    const response = await fetchWithTimeout(
        url,
        {
            method: 'PUT',
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
    return (await response.json()).message;
}

async function remove_favorite_bar(username, bar_id, fetch_timeout, ip) {
    username = falsy_to_empty(username);
    bar_id = falsy_to_empty(bar_id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/remove_favorite_bar';
    let data = {'username': username, 'bar_id': bar_id}
    const response = await fetchWithTimeout(
        url,
        {
            method: 'DELETE',
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
    return (await response.json()).message;
}

async function add_favorite_deal(username, deal_id, fetch_timeout, ip) {
    username = falsy_to_empty(username);
    deal_id = falsy_to_empty(deal_id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/add_favorite_deal';
    let data = {'username': username, 'deal_id': deal_id}
    const response = await fetchWithTimeout(
        url,
        {
            method: 'PUT',
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
    return (await response.json()).message;
}

async function remove_favorite_deal(username, deal_id, fetch_timeout, ip) {
    username = falsy_to_empty(username);
    deal_id = falsy_to_empty(deal_id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/remove_favorite_deal';
    let data = {'username': username, 'deal_id': deal_id}
    const response = await fetchWithTimeout(
        url,
        {
            method: 'DELETE',
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
    return (await response.json()).message;
}

async function send_friend_request(requester, requestee, fetch_timeout, ip) {
    requester = falsy_to_empty(requester);
    requestee = falsy_to_empty(requestee);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/friend_request';
    let data = {'requester': requester, 'requestee': requestee}
    const response = await fetchWithTimeout(
        url,
        {
            method: 'PUT',
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
    return (await response.json()).message;
}

async function accept_friend_request(requester, requestee, fetch_timeout, ip) {
    requester = falsy_to_empty(requester);
    requestee = falsy_to_empty(requestee);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/accept_friend';
    let data = {'requester': requester, 'requestee': requestee}
    const response = await fetchWithTimeout(
        url,
        {
            method: 'PUT',
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
    return (await response.json()).message;
}

async function remove_friend(user1, user2, fetch_timeout, ip) {
    user1 = falsy_to_empty(user1);
    user2 = falsy_to_empty(user2);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/remove_friend';
    let data = {'user1': user1, 'user2': user2}
    const response = await fetchWithTimeout(
        url,
        {
            method: 'DELETE',
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
    return (await response.json()).message;
}

async function upload_image(username, image, uuid, fetch_timeout, ip) {
    username = falsy_to_empty(username);
    image = falsy_to_empty(image);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/user/uploadimage?username=' + username + '&uuid=' + uuid;
    function createFormData(username, image) {
        const data = new FormData();
  
        data.append("image", {
          name: username + '.png',
          type: image.mime,
          uri: image.path
        });
      
        return data;
    }
    let data = createFormData(username, image);
    //console.log(data);
    const response = await fetchWithTimeout(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        },
        fetch_timeout
    );
    if (response.status != 200) {
        throw (await response.json()).message;
    }
    // Returns a new user object.
    return (await response.json()).message;
}

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
    upload_image,
};
