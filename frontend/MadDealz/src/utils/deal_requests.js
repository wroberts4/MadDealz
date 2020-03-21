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
  return response;
};

module.exports = {create_deal};
