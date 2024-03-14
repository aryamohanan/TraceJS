import express from 'express';
import { init, getCollectedRequests } from './instrumentation.js';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.send('Hello World, I am ES module');
});

app.get('/status', (req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (
    typeof process.send === 'function' &&
    typeof instrumentation.getCollectedRequests === 'function'
  ) {
    const collectedRequests = getCollectedRequests();
    console.log(collectedRequests);
  }
  res.send('Hello World, I am healthy');
});

app.listen(3003, () => {
  console.log('Welcome to ES module express app');
});
