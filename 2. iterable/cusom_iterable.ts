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

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

console.log('----------------------')
const arr2 = [1, 2, 3]
for (const a of arr2) console.log(a)

let iter2 = arr2[Symbol.iterator]();
console.log(iter2.next()) // { value: 1, done: false }
for (const a of iter2) console.log(a) // 2, 3

console.log(iter2[Symbol.iterator]() == iter2) // true