const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

// Routes
app.get('/', (req, res) => {
  res.send("Hello world!")
});

const parksRoute = require('./routes/parks');
app.use('/parks', parksRoute);

// Connect to the database
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => console.log("Connected to the database")
);

app.listen(3000);
