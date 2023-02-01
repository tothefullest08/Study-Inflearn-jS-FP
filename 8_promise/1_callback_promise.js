import {log} from '../0_common/fx.js';

function add10(a, callback) {
  setTimeout(() => callback(a + 10), 100);
}

var a = add10(5, res => {
  add10(res, res => {
    add10(res, res => {
      // log(res);
    });
  });
});

log(a);

function add20(a) {
  return new Promise(resolve => setTimeout(() => resolve(a + 20), 100));
}

var b = add20(5)
  .then(add20)
  .then(add20)
.then(log);

log(b);

console.clear()
console.log('---------')

const delay100 = a => new Promise(resolve =>
  setTimeout(() => resolve(a), 100));

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;

const n1 = 10;
log(go1(go1(n1, add5), log));

const n2 = delay100(10);
log(go1(go1(n2, add5), log));