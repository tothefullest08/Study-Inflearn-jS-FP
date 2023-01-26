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

go(
  0,
  a => a+ 1,
  a => a+ 10,
  a => a+ 100,
  console.log); // 111