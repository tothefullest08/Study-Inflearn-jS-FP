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

const L = {};
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
}

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

// Array.prototype.join 보다 다형성이 높음. Array 뿐만 아니라 iterator 프로토콜을 따르는 모든 객체에게 적용 가능
const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter));

const queryStr = pipe(
  L.entries,
  L.map(([key, value]) => `${key}=${value}`),
  join('&')
);

log(queryStr({limit: 10, offset: 10, type: 'notice'}));





