const log = console.log
const L = {}
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
}

var it = L.map(a => a + 10, [1, 2, 3]);
log(it.next());
log(it.next());
log(it.next());
log(it.next());

L.filter