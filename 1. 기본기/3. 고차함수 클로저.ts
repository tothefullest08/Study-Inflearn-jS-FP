console.log('-------------------------')
const addMaker = a => b => a + b; // b 이하 함수가 a를 기억하고 있음 (클로저)
const add10 = addMaker(10)
console.log(add10.toString()) // b => a + b
console.log(add10(5)) //15

