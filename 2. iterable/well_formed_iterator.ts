const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? {done: true} : {value: i--, done: false}
      },
      [Symbol.iterator]() {
        return this;
      }
    }
  }
}
let iterator = iterable[Symbol.iterator]();
iterator.next()
for (const a of iterator) console.log(a) // 2, 1
for (const a of iterable) console.log(a) // 3, 2, 1
for (const a of iterable[Symbol.iterator]()) console.log(a) // 3, 2, 1
