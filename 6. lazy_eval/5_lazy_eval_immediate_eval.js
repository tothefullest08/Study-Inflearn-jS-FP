const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const log = console.log


// range, map, filter, take, reduce 중첩 사용
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  }

  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) res.push(a);
  }
  return res;
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

/**
 * 즉시 평가
 * range에서 값을 모두 만들어놓고 순차적으로 평가 진행
 *
 * 평가 순서
 * 1. range: [0, 1, 2, 3, ...]
 * 2. map: [10, 11, 12, 13, ...]
 * 3. filter: [11, 13, ...]
 * 4. take: [11, 13]
 */
console.time('')
go(range(100000),
  map(n => n + 10),
  filter(n => n % 2),
  take(10),
  log);
console.timeEnd('')  // 12.263 ms

// L.range, L.map, L.filter, take, reduce 중첩 사용
const L = {}
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      yield a;
    }
  }
});

/**
 * 지연 평가
 * 1. take(take할 걸 줘) -> filter(filter할 걸 줘) -> map (map 할걸 줘) -> range  (0을 줄게)
 * 2. 0 값을 바탕으로 map -> filter -> take... (반복)
 *
 * 평가 순서
 * 1. 0(range 첫번째 값) -> 10 (map) -> false (filter fail)
 * 2. 1(range) -> 11(map) -> true(filter) -> take
 */
console.time('')
go(L.range(10000),
  L.map(n => n + 10),
  L.filter(n => n % 2),
  take(10),
  log);
console.timeEnd('') // 0.205 ms
