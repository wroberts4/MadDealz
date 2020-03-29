const fetch = require('node-fetch');

let IP = 'https://api.maddealz.software'
const FETCH_TIMEOUT = 3000;

async function fetchWithTimeout(url, options) {

  return await new Promise(async function(resolve, reject) {
      const timeout = setTimeout(function() {
          throw url + ' timed out with options ' + JSON.stringify(options);
      }, FETCH_TIMEOUT);
      try {
        const response = await fetch(IP + url, options);
        clearTimeout(timeout);
        resolve(response);
        return response;
      } finally {}
  })
}

module.exports = {fetchWithTimeout};