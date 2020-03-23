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
 * Description: Get a bar from the system.
 *
 * @param  {list of strings} ids
 *
 * @return {list of object} list of bar objects containing name and address.
 */
async function get_bars(ids){
  let bars = [];
  for (let i = 0; i < ids.length; i++) {
      bars.push(await get_bar(ids[i]));
  }
  // Returns a new bar object.
  return bars;
};

/**
 * Description: Get list of bars sorted by closest location to user
 *
 * @return {list of object} list of bar objects containing name and address.
 */
async function get_bar_list(){
  const response = await fetchWithTimeout('/bar/list', {
    method: 'GET'
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
  // Returns a list of bar objects
  return await response.json().bars;
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

module.exports = {create_bar, delete_bar, get_bar, get_bars, update_bar, get_bar_list};
