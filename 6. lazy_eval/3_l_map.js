const log = console.log
const L = {}
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
}

const it = L.map(a => a + 10, [1, 2, 3]);

log([...it]);
log(it.next());
log(it.next());
log(it.next());
log(it.next());
