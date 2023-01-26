const log = console.log;

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});


const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const products = [
  {name: '반팔티', price: 15000, quantity: 1, is_selected: true},
  {name: '긴팔티', price: 20000, quantity: 2, is_selected: false},
  {name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: true},
  {name: '후드티', price: 30000, quantity: 4, is_selected: false},
  {name: '바지', price: 25000, quantity: 5, is_selected: false}
];

const add = (a, b) => a + b;

// 1. total quantity
// case 1
const total_quantity = products => go(products,
  map(p => p.quantity),
  reduce(add),
  log);

total_quantity(products);

// case 2
const total_quantity2 = pipe(
  map(p => p.quantity),
  reduce(add),
);

log(total_quantity2(products));


// 2. total price
const total_price = pipe(
  map(p => p.price * p.quantity),
  reduce(add)
);
log(total_price(products));

// 3. 추상화 레벨 높이기
const sum = (f, iter) => go(
  iter,
  map(f),
  reduce(add));

log(sum(p => p.quantity, products));
log(sum(p => p.quantity * p.price, products));

const total_qty = products => sum(p => p.quantity, products);
log(total_qty(products))

const total_price2 = products => sum(p => p.quantity * p.price, products);
log(total_price2(products))

// 4. currying
const sum2 = curry((f, iter) => go(
  iter,
  map(f),
  reduce(add)));

const total_qty3 = sum2(p => p.quantity);
const total_price3 = sum2(p => p.quantity * p.price);
log(total_qty3(products))
log(total_price3(products))

