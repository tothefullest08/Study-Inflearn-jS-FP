const map = (f, iter) => {
  let res = []
  for (a of iter) {
    res.push(f(a))
  }
  return res
}

// generator
function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

console.log(map(a => a * a, gen()))

// Map 객체
let m = new Map();
m.set('a', 10);
m.set('b', 20);

const it = m[Symbol.iterator]();
console.log(it.next())
console.log(it.next())
console.log(it.next())

console.log(new Map(map(([key, value]) => [key, value * 2], m)))