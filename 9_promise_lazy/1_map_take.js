import {log, go, L, take, map, takeAll} from '../0_common/fx.js';

go(
  [1, 2, 3],
  L.map(a => a + 10),
  takeAll,
  log);



go(
  [1, 2, 3],
  L.map(a => Promise.resolve(a + 10)),
  takeAll,
  log);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map(a => a + 10),
  take(2),
  log);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map(a => Promise.resolve(a + 10)),
  take(2),
  log);

go(
  [1, 2, 3],
  map(a => Promise.resolve(a + 10)),
  take(2),
  log);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map(a => a + 10),
  take(2),
  log);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map(a => Promise.resolve(a + 10)),
  take(2),
  log);