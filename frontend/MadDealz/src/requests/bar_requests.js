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
 * @param  {string} name
 */
async function delete_bar(name){
  const response = await fetchWithTimeout('/bar/delete?name=' + name, {
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
 * Description: Get a bar from the system.
 *
 * @param  {string} name
 *
 * @return {object} bar object containing name and address.
 */
async function get_bar(name){
  const response = await fetchWithTimeout('/bar?name=' + name, {
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
 * Description: Get a bar from the system.
 *
 * @param  {list of strings} names
 *
 * @return {list of object} list of bar objects containing name and address.
 */
async function get_bars(names){
  let bars = [];
  for (let i = 0; i < names.length; i++) {
      bars.push(await get_bar(names[i]));
  }
  // Returns a new bar object.
  return bars;
};

/**
 * Description: Update a bar in the system.
 *
 * @param {object} bar
 *   @subparam   {string} name
 *   @subpparam  {string} address
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
};

module.exports = {create_bar, delete_bar, get_bar, get_bars, update_bar};
