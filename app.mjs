import hook from './tracer.js';

hook.init();
import got from 'got';
import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.send('Hello World, I am ES module');
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
  console.log('Welcome to ES module express app');
});
