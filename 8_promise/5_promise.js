import {log} from '../0_common/fx.js';

Promise.resolve(Promise.resolve(Promise.resolve(1))).then(log);

new Promise(resolve => resolve(new Promise(resolve => resolve(1)))).then(log);
