import { init, getCollectedRequests } from './instrumentation.js';

// Call the init function to intercept require for express
init();

// Perform other operations if needed

// Retrieve collected requests
// const collectedRequests = getCollectedRequests();
// console.log(collectedRequests);
