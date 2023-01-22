function* odds(limit) {
  for (let i = 0; i < limit; i++) {
    if (i % 2) yield i;
  }
}


let iter2 = odds(10)
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log('-----------------------------')

function* infinity(i = 0) {
  while (true) {
    yield i++
  }
}

let iter3 = infinity();
console.log(iter3.next())
console.log(iter3.next())
console.log(iter3.next())
console.log(iter3.next())
console.log(iter3.next())
console.log('-----------------------------')

function* odds2(l) {
  for (const a of infinity(1)) {
    if (a % 2) yield a;
    if (a === l) return;
  }
}

let iter4 = odds2(3);
console.log(iter4.next())
console.log(iter4.next())
console.log(iter4.next())
console.log('-----------------------------')

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

let iter5 = limit(4, [1, 2, 3, 4, 5, 6])
console.log(iter5.next())
console.log(iter5.next())
console.log(iter5.next())
console.log(iter5.next())
console.log('-----------------------------')

function* odds3(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

let iter6 = odds3(5);
console.log(iter5.next())
console.log(iter5.next())
console.log(iter5.next())
console.log(iter5.next())
console.log('-----------------------------')


// 전개 연산자
console.log(...odds3(5))
console.log([...odds3(5), ...odds3(10)])

// 구조분해
const [head, ...tail] = odds3(10);
console.log(head);
console.log(tail)

const [a, b, ...rest] = odds3(10);
console.log(a);
console.log(b);
console.log(rest)
