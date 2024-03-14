'use strict';

const Module = require('module');

// Store the original Module._load method
const originalLoad = Module._load;

let targetModules = [];

/**
 * Sets up a hook to require(moduleName) and apply the given transformation function before returning the loaded module.
 *
 * @param {string} moduleName - The name of the module to modify when loaded via require.
 * @param {function} instrument - The function called when the module is loaded via require. Ensure to return the modified module reference.
 * @throws {Error} Throws an error if moduleName is not a string or instrument is not a function.
 */
function initHook(moduleName, instrument) {
  if (typeof moduleName !== 'string') {
    throw new Error(`moduleName must be a string, received ${moduleName}`);
  }
  if (typeof instrument !== 'function') {
    throw new Error(`instrument must be a function, received ${instrument}`);
  }
  targetModules.push({ moduleName, instrument });
}

/**
 * Intercepts module loading and applies transformation if the loaded module matches any of the target modules.
 * @param {string} moduleName - The name of the module to load.
 * @returns {*} The loaded module, possibly transformed.
 */
function hookModuleLoad(moduleName) {
  for (const { moduleName: targetModuleName, instrument } of targetModules) {
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

// Set up the module hook
exports.initHook = initHook;

// Override the Module._load method with the hook
Module._load = hookModuleLoad;
