/***
 * 함수를 받아서: f
 * 함수를 리턴함: =>
 * 리턴된 함수가 실행되었을 때: (a, ..._)
 * 인자가 2개 이상이라면: _.length ?
 * 받아둔 함수를 즉시 실행: f(a, ..._)
 * 인자가 2개 미만이라면:
 *  - 함수를 리턴한 후에 (..._)
 *  - 그이후에 받은 인자를 합쳐서 실행 f(a, ..._)
 */
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const multi = curry((a, b) => a * b);
console.log(multi.toString()); // (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._)
console.log(multi(1).toString()); // (..._) => f(a, ..._)
console.log(multi(1)(2)); // 6

const multi3 = multi(3);
console.log(multi3(10)); // 30
console.log(multi3(5)); // 15
console.log(multi3(3)); // 9


console.log('---------------')

const products = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000}
];


const map = curry((f, iter) => {
  let res = []
  for (const a of iter) {
    res.push(f(a))
  }
  return res
})

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
})

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value
  }

  for (const a of iter) {
    acc = f(acc, a)

  }
  return acc;
})

const add = (a, b) => a + b;

const go = (...args) => reduce((a, f) => f(a), args);

// before
go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  console.log
)

// after
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  console.log
)

