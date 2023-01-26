const log = console.log

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res
};

const lRange = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const take = (l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }

  return res;
};

log(take(5, range(1000000)));
log(take(5, lRange(1000000)));