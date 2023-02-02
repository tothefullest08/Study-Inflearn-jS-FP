export const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
export const go = (...args) => reduce((a, f) => f(a), args);
export const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
export const log = console.log

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);


// 즉시 평가
export const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    // log(i, 'range')
    res.push(i);
  }
  return res
};

// export const map = curry((f, iter) => {
//   let res = [];
//   iter = iter[Symbol.iterator]();
//   for (const a of iter) {
//     res.push(f(a));
//   }
//
//   return res;
// });



export const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});


// 지연 평가
export const L = {}
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield go1(a, f);
  }
});


L.filter = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      yield a;
    }
  }
});

const isIterable = a => a && a[Symbol.iterator];


// 결과를 만드는 함수
export const find = curry((f, iter) => go(
  iter,
  L.filter(f),
  take(1),
  ([a]) => a
));


export const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value
  }
  return go1(acc, function recur(acc) {
    for (const a of iter) {
      acc = f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

export const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a.then(a => {
          res.push(a);
          if (res.length === l) return res;
          return recur();
        });
      }
      res.push(a);
      if (res.length === l) return res;
    }

    return res;
  } ()
});

export const takeAll = take(Infinity);

export const map = curry(pipe(L.map, takeAll));

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield *a;
    }
    else yield a;
  }
};

export const flatten = pipe(L.flatten, takeAll);

L.deepFlat = function *f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield *f(a);
    else yield a;
  }
};

L.flatMap = curry(pipe(L.map, L.flatten));


export const flatMap = curry(pipe(L.map, flatten));
