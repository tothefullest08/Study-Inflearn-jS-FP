const iterableObj = {
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


for (const a of iterableObj) {
  console.log(a)
}

const arr2 = [1,23,4]
let iterator = arr2[Symbol.iterator]()
for (const a of iterator) {
  console.log(a)
}

for (const a of iterator) {
  console.log(a)
}


console.log(arr2[Symbol.iterator]() === arr2[Symbol.iterator]()[Symbol.iterator]())
console.log(iterator === iterator[Symbol.iterator]())