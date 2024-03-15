# Instrumentation for Node.js Libraries

This instrumentation module enhances tracing in Node.js applications. It allows you to capture and log trace data for HTTP requests made using the 'got' module. This can be extend in the future.


## Usage

Once initialized, the instrumentation module will automatically intercept and trace HTTP requests made using the 'got' module. Traced data will be collected and logged to the console.

## ESM support

node --loader ./esm-loader.mjs app.mjs