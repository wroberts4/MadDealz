// This function recursively converts input into a javascript object, preserving
// "falsy" objects.
function convert_to_object(string) {
  // JSON.parse does not convert undefined string to undefined or NaN string to NaN.
  if (string === "undefined") {
    return undefined;
  } else if (string === "NaN") {
    return NaN;
  };
  let obj = string;
  if (typeof string === 'string') {
    try {
      obj = JSON.parse(string);
    } catch{return string};
  }
  // credit: https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          obj[key] = convert_to_object(obj[key]);
      };
  };
  return obj;
};
