console.log('고차 함수1-------------------------')
const apply1 = f => f(1);
const add2 = a => a + 2;
// const apply2 = f => (a => a + 2)(1);

console.log(apply1(add2))
console.log(apply1(a => a - 1))

console.log('고차 함수2-------------------------')
const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i)
}
times(console.log, 3);
times(a => console.log(a + 10), 3);