import { createReadStream, writeFileSync } from "fs";
import { createInterface } from "readline";
import path from "path";
import clear from "../res/clear.json";

const dirname = path.resolve(path.dirname(""));

const cyrLettersCodeSet = ["А".charCodeAt(), "я".charCodeAt()];
const validCodes = ["Ё".charCodeAt(), "ё".charCodeAt(), " ".charCodeAt(), "-".charCodeAt(), "'".charCodeAt()];

function filterCyr(name, names) {
  if (clear[name]) {
    return clear[name];
  }
  return names.filter(word =>
    [...word].every(letter => {
      const code = letter.charCodeAt();
      return (code >= cyrLettersCodeSet[0] && code <= cyrLettersCodeSet[1]) || validCodes.includes(code);
    })
  );
}

function pushTo(arr, { data, n, la, lo }) {
  arr.push({
    n,
    a: data,
    la: +la,
    lo: +lo
  });
}

const cities = createReadStream(`${dirname}/res/cities500.txt`);
const readline = createInterface({ input: cities });
const text = [];
const empty = [];
const needClear = {};

readline.on("line", line => {
  const [, n, , a, la, lo] = line.split("\t");
  if (a.length) {
    const arr = a.split(",");
    const filtered = filterCyr(n, arr).map(w => w.toLowerCase());
    if (filtered.length) {
      pushTo(text, { data: filtered, n, la, lo });
      if (filtered.length > 1) {
        needClear[n] = filtered;
      } else {
        needClear[n] = clear[n];
      }
    } else {
      pushTo(empty, { data: arr, n, la, lo });
    }
  } else {
    pushTo(empty, { data: [], n, la, lo });
  }
});

readline.on("close", () => {
  writeFileSync(`${dirname}/bundle/cities500.json`, JSON.stringify(text, null, 2), "utf8");
  writeFileSync(`${dirname}/bundle/empty500.json`, JSON.stringify(empty, null, 2), "utf8");
  writeFileSync(`${dirname}/res/clear.json`, JSON.stringify(needClear, null, 2), "utf8");
});
