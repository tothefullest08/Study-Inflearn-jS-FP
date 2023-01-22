const a = [1, 2];
console.log(...a); // 1, 2
console.log([...a, ...[3, 4]]); // [1,2,3,4]

// a[Symbol.iterator] = null;
// console.log([...a, ...[3, 4]]); // TypeError: a is not iterable

const set = new Set([1, 2, 3]);
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log([...a, ...set, ...map]);
for (const b of [...a, ...set, ...map]) {
  console.log(b)
}