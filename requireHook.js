const Module = require('module');
const path = require('path');
const originalLoad = Module._load;

let instrumentedModules = [];

function initHook(moduleName, instrument) {
  if (typeof moduleName !== 'string' || typeof instrument !== 'function') {
    throw new Error(
      `moduleName must be a string and instrument must be a function`
    );
  }
  instrumentedModules.push({ moduleName, instrument });
}

function hookModuleLoad(moduleName, parent) {
  const orgModuleName = moduleName;
  // Extracting the module name from the path for ESM modules
  if (
    path.isAbsolute(moduleName) &&
    ['.node', '.json', '.ts'].indexOf(path.extname(moduleName)) === -1
  ) {
    const match = moduleName.match(/node_modules\/((@.*?\/.*?)|(.*?))(?=\/|$)/);

    if (match && match[1]) {
      moduleName = match[1];
    }
  }
  for (const {
    moduleName: targetModuleName,
    instrument,
  } of instrumentedModules) {
    if (moduleName === targetModuleName) {
      // Load the module via the original Module._load implementation.
      const originalModule = originalLoad.call(Module, orgModuleName, parent);
      return instrument(originalModule);
    }
  }

  // Forward the call to the original module loading implementation if this is not the targeted module.
  return originalLoad.call(Module, orgModuleName, parent);
}

exports.initHook = initHook;
Module._load = hookModuleLoad;
