const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello world!");
});

const parksRoute = require("./routes/parks");
app.use("/api/v1/parks", parksRoute);

// Connect to the database
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.listen(3000);
