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
async function create_deal(name, address, ip, fetch_timeout){
};

async function get_deal(id, ip, fetch_timeout) {
};

async function delete_deal(id, ip, fetch_timeout) {
};

async function update_deal(deal, ip, fetch_timeout) {
};

module.exports = {create_deal, get_deal, delete_deal, update_deal};
