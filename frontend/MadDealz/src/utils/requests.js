const fetch = require('node-fetch');

async function fetchWithTimeout(url, options, fetch_timeout) {
  fetch_timeout = fetch_timeout ? fetch_timeout : 3000;
  return await new Promise(async function(resolve, reject) {
      const timeout = setTimeout(function() {
          throw url + ' timed out with options ' + JSON.stringify(options);
      }, fetch_timeout);
      try {
        const response = await fetch(url, options);
        clearTimeout(timeout);
        resolve(response);
        return response;
      } finally {}
  })
}

function falsy_to_empty(obj) {
  if (obj === 0) {
    return 0;
  } else if (!obj) {
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