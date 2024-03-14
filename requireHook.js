const Module = require('module');

const originalLoad = Module._load;

let instrumentedModules = [];

function initHook(moduleName, instrument) {
  if (typeof moduleName !== 'string') {
    throw new Error(`moduleName must be a string, received ${moduleName}`);
  }
  if (typeof instrument !== 'function') {
    throw new Error(`instrument must be a function, received ${instrument}`);
  }
  instrumentedModules.push({ moduleName, instrument });
}
function hookModuleLoad(moduleName) {
  for (const {
    moduleName: targetModuleName,
    instrument,
  } of instrumentedModules) {
    if (moduleName === targetModuleName) {
      // Load the module via the original Module._load implementation.
      const originalModule = originalLoad.apply(Module, arguments);
      // Apply the instrument function to the loaded module and return the result.
      return instrument(originalModule);
    }
  }

  // Forward the call to the original module loading implementation if this is not the targeted module.
  return originalLoad.apply(Module, arguments);
}

exports.initHook = initHook;
Module._load = hookModuleLoad;
