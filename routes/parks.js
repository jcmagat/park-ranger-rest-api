const express = require("express");
const Park = require("../models/Park");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const parks = await Park.find();
    res.json(parks);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const park = new Park({
    name: req.body.name,
  });

  try {
    const savedPark = await park.save();
    res.json(savedPark);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
