const got = require('got');
const express = require('express');
const instrumentation = require('./instrumentation.js');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.send('Hello World, I am ES module');
});

app.get('/status', async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  try {
    const response = await got.get('https://example.com/?random=10000000000000000000000000000000');
    // const collectedRequests = response.body;
     console.log(instrumentation.getCollectedRequests());
    res.send('Hello World, I am healthy');
  } catch (error) {
    console.error('Error retrieving collected requests:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3003, () => {
  console.log('Welcome to ES module express app');
});
