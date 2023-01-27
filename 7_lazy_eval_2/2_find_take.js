const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const log = console.log


const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
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

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const L = {}
L.filter = curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
});


const users = [
  {age: 32},
  {age: 31},
  {age: 37},
  {age: 28},
  {age: 25},
  {age: 32},
  {age: 31},
  {age: 37}
];

const find = curry((f, iter) => go(
  iter,
  L.filter(f),
  take(1),
  ([a]) => a
));

log(find(u => u.age < 30)(users));


