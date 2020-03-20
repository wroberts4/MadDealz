const fetch = require('node-fetch');

let IP = 'https://api.maddealz.software'

/**
 * Description: Add a user into the system.
 *
 * @param  {string} name
 * @param  {string} address
 *
 * @return {object} deal object containing name and address.
 */
async function create_deal(name, address){
  let url = IP + '/deal/create';
  data = {'name' : name,
          'address': address};
  const response = await fetch(url, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
  });
  // Returns a new user object.
  return await response.json();
};

////////////////////////////////////// TESTS //////////////////////////////////////
async function test_create_deal(name, address) {
  let deal = await create_deal(name, address);
  console.log(deal);
  return deal;
}

async function test_suite() {
  await test_create_deal('test', 'fake street');
}
test_suite();