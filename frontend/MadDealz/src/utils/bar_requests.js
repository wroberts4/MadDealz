const fetch = require('node-fetch');

let IP = 'https://api.maddealz.software'

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
  let url = IP + '/bar/create';
  data = {'name' : name,
          'address': address};
  const response = await fetch(url, {
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
  let url = IP + '/bar/delete?name=' + name;
  const response = await fetch(url, {
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
  let url = IP + '/bar?name=' + name;
  const response = await fetch(url, {
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
  let url = IP + '/bar/update';
  const response = await fetch(url, {
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
