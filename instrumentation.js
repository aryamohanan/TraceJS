'use strict';

const simpleRequireHook = require('./simpleRequireHook.js');
const got = require('got');

const spans = [];
const dummydata = [
  {
    url: 'https://example.com/?random=1',
    method: 'get',
  },
  {
    url: 'https://example.com/?random=2',
    method: 'post',
  },
];
const methods = ['get', 'post'];

exports.init = function () {
  console.log('-------------------------');
  simpleRequireHook.interceptRequire('got', instrument);
};

function instrument(orgModule) {
  try {
    if (orgModule) {
      methods.forEach((method) => {
        if (typeof orgModule[method] === 'function') {
          const originalMethod = orgModule[method];
          orgModule[method] = function () {
            console.log(
              `Instrumenting got ${method} ${JSON.stringify(
                arguments
              )} method`
            );
            const requestInfo = { url: arguments[0], method };
            spans.push(requestInfo);
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

exports.getCollectedRequests = function () {
  if (spans.length === 0) {
    spans.push(dummydata);
  }
  return spans;
};
