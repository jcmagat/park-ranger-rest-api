const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.get('/', (req, res) => {
  res.send("Hello world!")
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => console.log("Connected to the database")
);

app.listen(3000);
