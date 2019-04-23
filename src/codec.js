function code(str, key) {
  return str
    .split("")
    .map(e => (e.charCodeAt().toString(2) ^ key).toString().padStart(8, "0"))
    .join("");
}

function decode(str, key) {
  return str
    .match(/\d{8}/g)
    .map(e => String.fromCharCode(+`0b${e ^ key}`))
    .join("");
}

const str = "NTY3OTk1NDM2NjU3NTQxMTIw.XL7aIw.ZiGZF9rYQw0zf5NlL5SSLFFS6MY";
const key = "01001001";

const coded = code(str, key);
const decoded = decode(coded, key);

console.log(decoded === str);
