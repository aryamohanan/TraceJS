# Instrumentation for Node.js Libraries

This instrumentation module enhances tracing in Node.js applications. It allows you to capture and log trace data for HTTP requests made using the 'got' module. This can be extend in the future.


## Usage

Once initialized, the instrumentation module will automatically intercept and trace HTTP requests made using the 'got' module. Traced data will be collected and logged to the console.

## ESM support

For Node.js version> = 18.19 and above

`node --import ./esm-loader.mjs app.mjs`

For Node.js version < 18.19 and below

`node --loader ./esm-loader.mjs app.mjs`


## Usecases to address 

- Instrumentation should work for CJS libraries
- Instrumentation should work for esm client apps with CJS libraries
- Instrumentation should work for client apps with pure esm ibraries (example got)
- Instrumentation work for all nodejs versions
- off threading is no longer an issue
- should fix https://github.com/nodejs/help/issues/4190
- WE DO NOT WANT to tell the customer to load the tracer.

