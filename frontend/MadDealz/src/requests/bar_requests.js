const fetchWithTimeout = require('../utils/requests').fetchWithTimeout;
const falsy_to_empty = require('../utils/requests').falsy_to_empty;

/**
 * Description: Add a bar into the system.
 *
 * @param  {string} name
 * @param  {string} password
 * @param  {string} email
 *
 * @return {object} bar object containing name and adsress.
 */
async function create_bar(name, address, ip, fetch_timeout) {
    name = falsy_to_empty(name);
    address = falsy_to_empty(address);
    data = {name: name, address: address};
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/bar/create';
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
    // Returns a new bar object.
    return (await response.json()).bar;
}

/**
 * Description: Delete a bar into the system.
 *
 * @param  {string} id
 */
async function delete_bar(id, ip, fetch_timeout) {
    id = falsy_to_empty(id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/bar/delete?id=' + id;
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
 * Description: Get a bar from the system.
 *
 * @param  {string} id
 *
 * @return {object} bar object containing name and address.
 */
async function get_bar(id, ip, fetch_timeout) {
    id = falsy_to_empty(id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/bar?id=' + id;
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
    // Returns a bar object.
    return (await response.json()).bar;
}

/**
 * Description: Get list of bars sorted by closest location to user
 *
 * @param {string} lat
 * @param {string} lon
 * @param {int} limit
 *
 * @return {list of object} list of bar objects containing name and address.
 */
async function get_bars(lat, lon, limit, distance, ip, fetch_timeout) {
    lat = falsy_to_empty(lat);
    lon = falsy_to_empty(lon);
    limit = falsy_to_empty(limit);
    distance = falsy_to_empty(distance);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url =
        ip +
        '/bar/list?limit=' +
        limit +
        '&lat=' +
        lat +
        '&lon=' +
        lon +
        '&distance=' +
        distance;
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
    return (await response.json()).bars;
}

/**
 * Description: Update a bar in the system.
 *
 * @param {object} bar
 *   @subparam   {string} id
 */
async function update_bar(bar, ip, fetch_timeout) {
    bar = falsy_to_empty(bar);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/bar/update';
    const response = await fetchWithTimeout(
        url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bar),
        },
        fetch_timeout
    );
    if (response.status != 200) {
        throw (await response.json()).message;
    }
    return (await response.json()).message;
}

async function get_deals(bar_id, ip, fetch_timeout) {}

async function get_reviews(bar_id, ip, fetch_timeout) {}

async function update_favorites(id, value, ip, fetch_timeout) {}

module.exports = {
    create_bar,
    delete_bar,
    get_bar,
    get_bars,
    update_bar,
    get_deals,
    get_reviews,
    update_favorites,
};
