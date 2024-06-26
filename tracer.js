'use strict';

const requireHook = require('./requireHook.js');

const spans = [];
const methods = ['get', 'post'];
const Span = {
  module: '',
  data: {},
  error: null,
  date: null,
};

exports.init = function () {
  requireHook.initHook('got', instrument);
};

function instrument(orgModule) {
  if (orgModule) {
    methods.forEach((method) => {
      if (typeof orgModule[method] === 'function') {
        const originalMethod = orgModule[method];
        orgModule[method] = function () {
          Span.module = orgModule.name;
          Span.data = {
            url: arguments[0],
            method: method
          };
          Span.date = new Date().toISOString();

          const request = originalMethod.apply(this, arguments);

          return request
            .then(() => {
              spans.push({ ...Span });
              console.log('collected trace data', spans);
            })
            .catch((err) => {
              Span.error = err.toString();
              spans.push({ ...Span });
              console.log('spans', spans);
            });
        };
      }
    });
  }

  return orgModule;
}
