'use strict';

const requireHook = require('./requireHook.js');
const iitmHook = require('./iitmHook.js');
const { instrument: gotInstrumentation } = require('./instrumentations/got.js');
const {
  instrument: superagentInstrumentation,
} = require('./instrumentations/got.js');

const instrumentedModules = [
  {
    moduleName: 'got',
    hookFn: gotInstrumentation,
  },
  { moduleName: 'superagent', hookFn: superagentInstrumentation },
];
function init() {
  for (let instrumentedModule of instrumentedModules) {
    requireHook.initHook(
      instrumentedModule.moduleName,
      instrumentedModule.hookFn
    );
    iitmHook.init(instrumentedModule.moduleName);
  }
}

module.exports = { init };
