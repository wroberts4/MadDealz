const fetchWithTimeout = require('../utils/requests').fetchWithTimeout;
const falsy_to_empty = require('../utils/requests').falsy_to_empty;

async function create_review(content, bar_id, score, user, fetch_timeout, ip) {
    content = falsy_to_empty(content);
    bar_id = falsy_to_empty(bar_id);
    score = falsy_to_empty(score);
    user = falsy_to_empty(user);
    data = {'content': content, 'bar_id': bar_id, 'score': score, 'user': user};
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/review/create';
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
    // Returns a new review object.
    return (await response.json()).review;
};

async function get_review(id, fetch_timeout, ip) {
    id = falsy_to_empty(id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/review?id=' + id;
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
    // Returns a new review object.
    return (await response.json()).review;
};

async function delete_review(id, fetch_timeout, ip) {
    id = falsy_to_empty(id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/review/delete?id=';
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
    // Returns a new review object.
    return (await response.json()).message;
};

async function update_review(content, bar, score, fetch_timeout, ip) {
    content = falsy_to_empty(content);
    bar = falsy_to_empty(bar);
    score = falsy_to_empty(score);
    user = falsy_to_empty(user);
    data = {'content': content, 'bar': bar, 'score': score};
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/review/update';
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
    // Returns a new review object.
    return (await response.json()).message;
};

module.exports = {create_review, get_review, delete_review, update_review};