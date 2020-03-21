const fetchWithTimeout = require('../utils/requests').fetchWithTimeout;

/**
 * Description: Add a user into the system.
 *
 * @param  {string} name
 * @param  {string} address
 *
 * @return {object} deal object containing name and address.
 */
async function create_deal(name, address){
  data = {'name' : name,
          'address': address};
  const response = await fetchWithTimeout('/deal/create', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
  });
  if (response.status != 200) {
    throw (await response.json()).message;
  }
  // Returns a new deal object.
  return (await response.json()).deal;
};

module.exports = {create_deal};
