const express = require('express');

const { PORT } = process.env;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  res.send({
    server: 'api-1',
    message: 'Hello, world!',
    error: false,
  });
});

app.listen(PORT, HOST);

module.exports = app;
