const hook = require('./tracer.js');

hook.init();
const got = require('got');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.send('Hello World, I am CJS module');
});

app.get('/status', async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  try {
    const response = await got.get(
      'https://example.com/?random=10000000000000000000000000000000'
    );
    res.send('Hello World, I am healthy');
  } catch (error) {
    console.error('Error retrieving collected requests:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3003, () => {
  console.log('Welcome to CJS module express app');
});
