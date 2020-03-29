const fetchWithTimeout = require('../utils/requests').fetchWithTimeout;

/**
 * Description: Add a bar into the system.
 *
 * @param  {string} name
 * @param  {string} password
 * @param  {string} email
 *
 * @return {object} bar object containing name and adsress.
 */
async function create_bar(name, address){
  data = {'name' : name,
          'address': address};
  const response = await fetchWithTimeout('/bar/create', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
  // Returns a new bar object.
  return (await response.json()).bar;
};

/**
 * Description: Delete a bar into the system.
 *
 * @param  {string} id
 */
async function delete_bar(id){
  const response = await fetchWithTimeout('/bar/delete?id=' + id, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json'
     },
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }

  return (await response.json()).message;
};

/**
 * Description: Get a bar from the system.
 *
 * @param  {string} id
 *
 * @return {object} bar object containing name and address.
 */
async function get_bar(id){
  const response = await fetchWithTimeout('/bar?id=' + id, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json'
     },
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
  // Returns a bar object.
  return (await response.json()).bar;
};

/**
 * Description: Get list of bars sorted by closest location to user
 *
 * @param {string} lat
 * @param {string} lon
 * @param {int} limit
 * 
 * @return {list of object} list of bar objects containing name and address.
 */
async function get_bars(lat, lon, limit, distance){
  let url = '/bar/list?limit=' + limit + '&lat=' + lat  + '&lon=' + lon + '&distance=' + distance;
  const response = await fetchWithTimeout(url, {
    method: 'GET'
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
  // Returns a list of bar objects
  return (await response.json()).bars;
};

/**
 * Description: Update a bar in the system.
 *
 * @param {object} bar
 *   @subparam   {string} id
 */
async function update_bar(bar){
  const response = await fetchWithTimeout('/bar/update', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(bar)
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
  return (await response.json()).message;
};

async function get_deals(bar_id) {
};

async function get_reviews(bar_id) {
};

async function update_favorites(id, value) {
};

module.exports = {create_bar, delete_bar, get_bar, get_bars, update_bar,
                  get_deals, get_reviews, update_favorites};
