const products = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000}
];

// 명령형 코드
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
console.log(...under20000);

// filter 함수 정의
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
}

console.log(filter(product => product.price < 20000, products));

console.log(filter(n => n %2 , function *() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
} ()))