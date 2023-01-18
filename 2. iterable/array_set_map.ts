console.log('Arr ------------')
const arr = [1, 2, 3];
console.log(arr[Symbol.iterator].toString()) // function values() { [native code] }
// arr[Symbol.iterator] = null;
for (const a of arr) console.log(a) // TypeError: arr is not iterable


console.log('Set ------------')
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a) // 1, 2, 3
console.log(set[0]) // undefined

console.log('Map ------------')
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map) console.log(a) // [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ]
console.log(map[0]) // undefined


console.log('이터러블, 이터레이터 ------------')
const arr2 = [1,2,3]
let iterator = arr2[Symbol.iterator](); // Object [Array Iterator] {}
console.log(iterator)
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }


