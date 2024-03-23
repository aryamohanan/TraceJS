const hook = require('import-in-the-middle');

const spans = [];
const methods = ['get', 'post'];
const supportedModules = ['got'];
const Span = {
  module: '',
  data: {},
  error: null,
  date: null,
};

function init(module) {
  hook([module], (moduleExports, name, basedir) => {
    if (moduleExports && moduleExports.default) {
      moduleExports.default = instrument(moduleExports.default, name);
      return moduleExports;
    } else {
      return instrument(moduleExports, name);
    }
  });
}

function instrument(orgModule, moduleName) {
  if (orgModule) {
    methods.forEach((method) => {
      if (typeof orgModule[method] === 'function') {
        const originalMethod = orgModule[method];
        orgModule[method] = function () {
          Span.module = moduleName;
          Span.data = {
            url: arguments[0],
            method: method,
          };
          Span.date = new Date().toISOString();

          const request = originalMethod.apply(this, arguments);

          return request
            .then(() => {
              spans.push({ ...Span });
              console.log('Collected trace data:', spans);
            })
            .catch((err) => {
              Span.error = err.toString();
              spans.push({ ...Span });
              console.log('Error occurred, spans:', spans);
            });
        };
      }
    });
  }

  return orgModule;
}
module.exports = { init };
