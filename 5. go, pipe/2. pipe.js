const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value
  }

  for (const a of iter) {
    acc = f(acc, a)

  }
  return acc;
}

const go = (...args) => reduce((a, f) => f(a), args);

/**
 * ..fs: pipe의 함수들을 펼침
 * a: f 함수의 인자
 */
const pipe = (...fs) => (a) => go(a, ...fs);

const f = pipe(
  a => a + 1,
  a => a + 10,
  a => a + 100);

console.log(f(0));

// 응용: 2가지 인자를 처음에 받기
// ...as : f2가 받을 인자
const pipe2 = (f, ...fs) => (...as) => go(f(...as), ...fs);
const f2 = pipe2(
  (a,b) => a + b,
  a => a + 10,
  a => a + 100);

console.log(f2(0, 1))