import {log, go} from '../0_common/fx.js';

go(Promise.resolve(1),
  a => a + 10,
  a => Promise.reject('error~~~~'),
  a => console.log('------'),
  a => a + 1000,
  a => a + 10000,
  log).catch(a => console.log(a));