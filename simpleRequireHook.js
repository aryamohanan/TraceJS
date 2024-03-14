'use strict';

const Module = require('module');

const origLoad = Module._load;

let targetModuleName;
let transformer;
let cachedTransformedModule;

/**
 * Sets up the hook to intercept a call to require(moduleName) and apply the given transformer function before actually
 * returning the loaded module.
 *
 * @param targetModuleName_ the name of the module that you want to modify when it is loaded via require
 * @param transformer_ this function is called when the module in question is loaded via require. Do not forget to
 * return a reference to the modified module at the end.
 */
exports.interceptRequire = function interceptRequire(targetModuleName_, transformer_) {
  if (typeof targetModuleName_ !== 'string') {
    throw new Error(`Argument targetModuleName is required and needs to be a string, got ${targetModuleName_}`);
  }
  if (typeof transformer_ !== 'function') {
    throw new Error(`Argument transformer_ is required and needs to be a function, got ${targetModuleName_}`);
  }
  targetModuleName = targetModuleName_;
  transformer = transformer_;
};

Module._load = function patchedModuleLoad(moduleName) {
  if (moduleName !== targetModuleName) {
    // This is not the module we want to intercept, forward the call to the original module loading implementation.
    return origLoad.apply(Module, arguments);
  }

  if (cachedTransformedModule) {
    // This module has been required before and we have already transformed it.
    return cachedTransformedModule;
  }

  // Load the module via the original Module._load implementation first.
  const originalModule = origLoad.apply(Module, arguments);

  cachedTransformedModule = transformer(originalModule);

  return cachedTransformedModule;
};
