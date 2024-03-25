const hook = require('import-in-the-middle');
/**
 * This function initializes import-in-the-middle hook for a specific module.
 * The provided callback function will be executed whenever this module is imported.
 *
 * @param {object} module - The target module to be instrumented.
 * @param {function} hookFn - The function to be applied to the module's exports.
 *                             This function receives the original exports and
 *                              modifies them.
 
 */
function init(module, hookFn) {
  hook([module], (moduleExports, name, basedir) => {
    // Handle both ESM and CommonJS modules appropriately:
    //  See the handling of the `default` property at
    //  https://nodejs.org/api/esm.html#commonjs-namespaces
    if (moduleExports && moduleExports.default) {
      // If the module has a 'default' export (common in ESM):
      // Apply the hook function to the 'default' export
      // Return the modified module exports
      moduleExports.default = hookFn(moduleExports.default);
      return moduleExports;
    } else {
      // If the module doesn't have a 'default' export (common in CommonJS):
      // Apply the hook function to the entire module exports
      // Return the modified module exports
      return hookFn(moduleExports);
    }
  });
}

module.exports = { init };
