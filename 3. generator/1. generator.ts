function *gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100;
}

let iter = gen();
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 3, done: false }
console.log(iter.next()); // { value: 100, done: true }

console.log(iter[Symbol.iterator]() == iter) // true

for (const a of gen()) {
  console.log(a)
}