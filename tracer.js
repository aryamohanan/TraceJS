'use strict';

const requireHook = require('./requireHook.js');
const got = require('got');

const spans = [];
const methods = ['get', 'post'];

exports.init = function () {
  console.log('-------------------------');
  requireHook.setupModuleInterception('got', instrument);
};

function instrument(orgModule) {
  try {
    if (orgModule) {
      methods.forEach((method) => {
        if (typeof orgModule[method] === 'function') {
          const originalMethod = orgModule[method];
          orgModule[method] = function () {
            console.log(
              `Instrumenting got ${method} ${JSON.stringify(arguments)} method`
            );
            const requestInfo = { url: arguments[0], method };
            spans.push(requestInfo);
            console.log('collected trcae data', spans);
            return originalMethod.apply(this, arguments);
          };
        }
      });
    }
  } catch (err) {
    console.log('error occurred', err);
  }

  return orgModule;
}
