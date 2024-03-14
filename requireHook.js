'use strict';

const Module = require('module');

// Store the original Module._load method
const originalLoad = Module._load;

let targetModuleName;
let transformFunction;
let cachedTransformedModule;

/**
 * Sets up a hook to intercept a call to require(moduleName) and apply the given transformation function before returning the loaded module.
 *
 * @param {string} moduleName - The name of the module to modify when loaded via require.
 * @param {function} transformer - The function called when the module is loaded via require. Ensure to return the modified module reference.
 * @throws {Error} Throws an error if moduleName is not a string or transformer is not a function.
 */
function setupModuleInterception(moduleName, transformer) {
  if (typeof moduleName !== 'string') {
    throw new Error(`moduleName must be a string, received ${moduleName}`);
  }
  if (typeof transformer !== 'function') {
    throw new Error(`transformer must be a function, received ${transformer}`);
  }
  targetModuleName = moduleName;
  transformFunction = transformer;
}

/**
 * Intercepts module loading and applies transformation if the loaded module matches the targetModuleName.
 * @param {string} moduleName - The name of the module to load.
 * @returns {*} The loaded module, possibly transformed.
 */
function interceptModuleLoad(moduleName) {
  if (moduleName !== targetModuleName) {
    // Forward the call to the original module loading implementation if this is not the targeted module.
    return originalLoad.apply(Module, arguments);
  }

  if (cachedTransformedModule) {
    // Return the previously transformed module if it exists.
    return cachedTransformedModule;
  }

  // Load the module via the original Module._load implementation.
  const originalModule = originalLoad.apply(Module, arguments);

  // Apply the transformer function to the loaded module and cache the result.
  cachedTransformedModule = transformFunction(originalModule);

  return cachedTransformedModule;
}

// Set up the module interceptor
exports.setupModuleInterception = setupModuleInterception;

// Override the Module._load method with the interceptor
Module._load = interceptModuleLoad;
