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
  // Returns a new bar object.
  return await response.json();
};

/**
 * Description: Delete a bar into the system.
 *
 * @param  {string} name
 *
 * @return {object} bar object containing name and address.
 */
async function delete_bar(name){
  let url = IP + '/bar/delete?name=' + name;
  const response = await fetch(url, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json'
     },
  });
  // Returns a new bar object.
  return await response.json();
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
  // Returns a new bar object.
  return await response.json();
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
 *
 * @return {object} bar object containing name and address.
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
  // Returns a new bar object.
  return await response.json();
};

////////////////////////////////////// TESTS //////////////////////////////////////
async function test_delete_bar(name) {
  let response = await delete_bar(name);
  console.log(response);
}

async function test_create_bar(name, address) {
  let bar = await create_bar(name, address);
  console.log(bar);
  return bar;
}

async function test_get_bar(name) {
  let bar = await get_bar(name);
  console.log(bar);
  return bar;
}

async function test_get_bars(names) {
  let bars = await get_bars(names);
  console.log(bars);
  return bars;
}

async function test_update_bar(bar) {
  bar = await update_bar(bar);
  console.log(bar);
  return bar;
}

async function test_suite() {
  await test_delete_bar('test');
  await test_create_bar('test', 'fake street');
  await test_get_bar('test');
  await test_get_bars(['test']);
  await test_update_bar({'name': 'test', 'address': 'new fake street'});
}
test_suite();