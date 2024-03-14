# Instrumentation for Inter-process Communication in Node.js

This instrumentation module enhances tracing in Node.js applications. It allows you to capture and log trace data for HTTP requests made using the 'got' module.

## Installation

To use this instrumentation module, follow these steps:

1. Install the package:
    ```bash
    npm install my-instrumentation-module
    ```

2. Require the instrumentation module in your Node.js application:
    ```javascript
    const { init } = require('my-instrumentation-module');
    ```

3. Initialize the instrumentation module:
    ```javascript
    init();
    ```

## Usage

Once initialized, the instrumentation module will automatically intercept and trace HTTP requests made using the 'got' module. Traced data will be collected and logged to the console.

### Example

```javascript
const got = require('got');

(async () => {
  const response = await got('https://example.com');
  console.log(response.body);
})();



node --loader ./esm-loader.mjs app.mjs