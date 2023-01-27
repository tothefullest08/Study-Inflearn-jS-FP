import {curry, go, pipe, log, range, map, filter, L, find, reduce, take} from '../0_common/fx.js';


const takeAll = take(Infinity);

// L.map + take로 map 만들기
const map1 = curry((f, iter) => go(
  L.map(f, iter),
  takeAll
));

log(map1(a => a + 10, L.range(4)));


const map2 = curry(pipe(L.map, takeAll));

log(map2(a => a + 10, L.range(4)));


// L.filter + take로 filter 만들기
const filter1 = curry(pipe(L.filter, takeAll));

log(filter1(a => a % 2, range(4)));