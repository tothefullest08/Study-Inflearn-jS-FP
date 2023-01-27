import {curry, go, takeAll, pipe, log, range, map, filter, L, find, reduce, take} from '../0_common/fx.js';

log([...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]]);

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield *a;
    }
    else yield a;
  }
};

var it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
log([...it])
log(take(3, L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]])));


const flatten = pipe(L.flatten, takeAll);
log(flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));