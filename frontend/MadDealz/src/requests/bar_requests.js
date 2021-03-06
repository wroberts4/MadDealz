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
async function create_bar(name, address, fetch_timeout, ip) {
    name = falsy_to_empty(name);
    address = falsy_to_empty(address);
    let data = {name: name, address: address};
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
async function delete_bar(id, fetch_timeout, ip) {
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
async function get_bar(id, fetch_timeout, ip) {
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
async function get_bars(lat, lon, limit, distance, fetch_timeout, ip) {
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
async function update_bar(bar, fetch_timeout, ip) {
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

async function get_deals(id, fetch_timeout, ip) {
    id = falsy_to_empty(id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/bar/deals?id=' + id;
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
    return (await response.json()).deals;
}

async function get_reviews(id, fetch_timeout, ip) {
    id = falsy_to_empty(id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/bar/reviews?id=' + id;
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
    return (await response.json()).reviews;
}

async function update_favorites(id, value, fetch_timeout, ip) {
    id = falsy_to_empty(id);
    value = falsy_to_empty(value);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/bar/update_favorites';
    let data = {'id': id, 'value': value};
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

async function upload_image(bar_id, image, uuid, fetch_timeout, ip) {
    bar_id = falsy_to_empty(bar_id);
    image = falsy_to_empty(image);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/bar/uploadimage?bar_id=' + bar_id + '&uuid=' + uuid;
    function createFormData(uuid, image) {
        const data = new FormData();
  
        data.append("image", {
          name: uuid + '.png',
          type: image.mime,
          uri: image.path
        });
      
        return data;
    }
    let data = createFormData(uuid, image);
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
    create_bar,
    delete_bar,
    get_bar,
    get_bars,
    update_bar,
    get_deals,
    get_reviews,
    update_favorites,
    upload_image
};
