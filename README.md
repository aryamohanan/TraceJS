# Instrumentation for Node.js Libraries

This apllication is a simulation of instrumentation of module tracing in Node.js applications. It allows us to capture and log trace data for  few modules. It enables us to capture instrumentations written in both commonjs and esm.


## ESM support


### How to rum

For nodejs version greater than or equal to 18.19

`node --import ./register.mjs app.mjs`

For nodejs version less than 18.19

`node --loader ./loader.mjs app.mjs`


## Steps

- Develop atest application that uses ESM modules to create a small web service that includes additional spans created via any of the instrumentations
- Implement loading of our instrumentation modules via the import-in-the-middle 


What worked

- workeddd
imported got and call hook directly with got 
hook(['got'], instrument.instrument(got)); --hook.mjs

node --inspect-brk=0.0.0.0:9229  --import ./hook.mjs app.mjs


