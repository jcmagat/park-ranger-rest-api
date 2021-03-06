const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

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

app.listen(5000);
