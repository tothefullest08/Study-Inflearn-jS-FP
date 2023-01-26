const map = (f, iter) => {
  let res = []
  for (const a of iter) {
    res.push(f(a))
  }
  return res
}

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
}

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value
  }

  for (const a of iter) {
    acc = f(acc, a)

  }
  return acc;
}

const products = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000}
];

const add = (a, b) => a + b;

console.log(
  reduce(
    add,
    map(p => p.price,
      filter(p => p.price < 20000, products))));


console.log(
  reduce(
    add,
    filter(n => n < 20000,
      map(p => p.price, products))));


const go = (...args) => reduce((a, f) => f(a), args);

go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  console.log
)