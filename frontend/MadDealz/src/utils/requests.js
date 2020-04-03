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

function falsy_to_empty(obj) {
  if (!obj) {
    return '';
  } else if (typeof obj != 'object') {
    return obj;
  }
  // credit: https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          obj[key] = falsy_to_empty(obj[key]);
      };
  };
  return obj;
}

module.exports = {fetchWithTimeout, falsy_to_empty};