const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const log = console.log

const map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  for (const a of iter) {
    res.push(f(a));
  }

  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value
  }
  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc;
});

const queryStr = pipe(
  Object.entries,
  map(([key, value]) => `${key}=${value}`),
  reduce((a, b) => `${a}&${b}`)
);

log(queryStr({limit: 10, offset: 10, type: 'notice'}));

const L = {};
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
}


//
// L.entries = function* (obj) {
//   for (const k in obj) yield [k, obj[k]];
// };
//
// const join = curry((sep = ',', iter) =>
//   reduce((a, b) => `${a}${sep}${b}`, iter));
//
// const queryStr = pipe(
//   L.entries,
//   L.map(([k, v]) => `${k}=${v}`),
//   join('&'));
//
// log(queryStr({limit: 10, offset: 10, type: 'notice'}));