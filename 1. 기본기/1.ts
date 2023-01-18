// 평가
console.log('평가-------------------------')

console.log(1)
console.log(1 + 2)
console.log((1 + 2) + 4)
console.log([1 + 2])
console.log([1 + 2, 4])
console.log([1, 2, ...[3, 4]])

// 일급
console.log('일급-------------------------')
const a = 10;
const add10 = a => a + 10;
add10(a);
console.log(add10(a))


// 일급 함수
console.log('일급 함수-------------------------')
const add5 = a => a + 5;
console.log(add5.toString())
console.log(add5(5))

console.log('-------------------------')

const f1 = () => () => 1;
console.log(f1().toString())

console.log('-------------------------')
const f2 = f1();
console.log(f2.toString())
console.log(f2().toString())
