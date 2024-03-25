# Instrumentation for Node.js Libraries

This apllication is a simulation of instrumentation of module tracing in Node.js applications. It allows us to capture and log trace data for modules. It enables us to capture instrumentations written in both commonjs and esm.

## Requirements 

- Develop a test application that uses ESM modules to create an express  server that includes a call with `got` and trace the got calls. From version 12 got is pure esm, see [releases] (https://github.com/sindresorhus/got/releases/tag/v12.0.0)

- Implement loading of our instrumentation modules via the `import-in-the-middle`.

- The application should trace both CommonJS and ESM libraries.



### How to rum

`npm run start`

Additionaly, 

For nodejs version greater than or equal to 18.19

`node --import ./register.mjs app.mjs`

For nodejs version less than 18.19

`node --loader ./loader.mjs app.mjs`
