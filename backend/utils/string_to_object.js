export function string_to_object(string) {
  // JSON.parse does not convert undefined string to undefined or NaN string to NaN.
  if (string === "undefined") {
    return undefined;
  } else if (string === "NaN") {
    return NaN;
  };
  try {
    return JSON.parse(string);
  } catch {};
  return string;
};
