import Hook from 'import-in-the-middle';
import got from 'got';

const spans = [];
const methods = ['get', 'post'];
const Span = {
  module: '',
  data: {},
  error: null,
  date: null,
};

Hook(['got'], instrument(got));

function instrument(orgModule) {
  if (orgModule) {
    methods.forEach((method) => {
      if (typeof orgModule[method] === 'function') {
        const originalMethod = orgModule[method];
        orgModule[method] = function () {
          Span.module = orgModule.name;
          Span.data = {
            url: arguments[0],
            method: method,
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
