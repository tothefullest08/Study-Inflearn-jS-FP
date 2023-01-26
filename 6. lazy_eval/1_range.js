const log = console.log

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value
  }

  for (const a of iter) {
    acc = f(acc, a)

  }
  return acc;
}

const add = (a, b) => a + b;

// range
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    // log(i, 'range')
    res.push(i);
  }
  return res
};
var list = range(4);
log(list);
log(reduce(add, list));

// lazy range
const L = {}
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

var list2 = L.range(4); // 내부 로그는 출력되지 앟음
log(list2);
log(reduce(add, list2)); // reduce로 순회할때 내부 로그 출력 및 평가 진행

console.log('----------------------')

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

test('range', 10, () => reduce(add, range(100000)));
test('lRange', 10, () => L.range(add, range(100000)));