import {curry, go, takeAll, pipe, flatten, log, range, map, filter, L, find, reduce, take} from '../0_common/fx.js';

// log([[1, 2], [3, 4], [5, 6, 7]].flatMap(a => a));
// log([[1, 2], [3, 4], [5, 6, 7]].flatMap(a => a.map(a => a * a)));
// log(flatten([[1, 2], [3, 4], [5, 6, 7]].map(a => a.map(a => a * a))));

L.flatMap = curry(pipe(L.map, L.flatten));
var it = L.flatMap(map(a => a * a), [[1, 2], [3, 4], [5, 6, 7]]);
log([...it]);

const flatMap = curry(pipe(L.map, flatten));
log(flatMap(a => a, [[1, 2], [3, 4], [5, 6, 7]]));
log(flatMap(range, [1, 2, 3]));
log(map(range, [1, 2, 3]));
var it = L.flatMap(L.range, map(a => a + 1, [1, 2, 3]));
log([...it]);
log(take(3, L.flatMap(L.range, map(a => a + 1, [1, 2, 3]))));
