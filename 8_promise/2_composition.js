import {log} from '../0_common/fx.js';

const g = a => a + 1;
const f = a => a * a;

log(f(g(1)));
log(f(g())); // NaN

// Array 는 값을 다루기 위한 도구에 불과함. 컨테이너에 있는 값이 어떠한 값이며 어떻게 변하냐가 중요
[1].map(g).map(f) // 함수 합성
  .forEach(r => log(r)); // 외부 세상에 효과를 만듦

[].map(g).map(f).forEach(r => log(r));

console.clear();

Array.of(1).map(g).map(f).forEach(r => log(r)); // Array
Promise.resolve(2).then(g).then(f).then(r => log(r)) // Promise

new Promise(resolve =>
  setTimeout(() => resolve(2), 100)
).then(g).then(f).then(r => log(r));