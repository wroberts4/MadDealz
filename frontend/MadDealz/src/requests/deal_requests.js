const fetchWithTimeout = require('../utils/requests').fetchWithTimeout;
const falsy_to_empty = require('../utils/requests').falsy_to_empty;

/**
 * Description: Add a user into the system.
 *
 * @param  {string} name
 * @param  {string} address
 *
 * @return {object} deal object containing name and address.
 */
async function create_deal(info, bar_id, times, fetch_timeout, ip) {
    info = falsy_to_empty(info);
    bar = falsy_to_empty(bar_id);
    times = falsy_to_empty(times);
    data = {'info': info, 'bar_id': bar_id, 'times': times};
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/deal/create';
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
    // Returns a new deal object.
    return (await response.json()).deal;
};

async function get_deal(id, fetch_timeout, ip) {
    id = falsy_to_empty(id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/deal?id=' + id;
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
    // Returns a new deal object.
    return (await response.json()).deal;
};

async function delete_deal(id, fetch_timeout, ip) {
    id = falsy_to_empty(id);
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/deal/delete?id=' + id;
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
    // Returns a new deal object.
    return (await response.json()).message;
};

async function update_deal(info, bar, times, fetch_timeout, ip) {
    info = falsy_to_empty(info);
    bar = falsy_to_empty(bar);
    times = falsy_to_empty(times);
    data = {'info': info, 'bar': bar, 'times': times};
    ip = ip ? ip : 'https://api.maddealz.software';
    let url = ip + '/deal/update';
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
    // Returns a new deal object.
    return (await response.json()).message;
};

module.exports = {create_deal, get_deal, delete_deal, update_deal};
