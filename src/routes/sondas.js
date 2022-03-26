const express = require("express");
const router = express.Router();
const Sonda = require("../models/sonda");

//Get All
router.get("/", async (req, res) => {
  try {
    const sondas = await Sonda.find();
    res.send(sondas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by Id
router.get("/:id", getById, (req, res) => {
  res.json(res.sonda);
});

//Delete by Id
router.delete("/:id", getById, async (req, res) => {
  try {
    await res.sonda.remove();
    res.json({ message: "Deleted item" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Create
router.post("/", async (req, res) => {
  const sonda = new Sonda(req.body);
  try {
    const newSonda = await sonda.save();
    res.status(201).json(newSonda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update
router.patch("/:id", getById, async (req, res) => {
  if (req.body.name != null) {
    res.sonda.name = req.body.name;
  }
  if (req.body.company != null) {
    res.sonda.company = req.body.company;
  }
  try {
    const newSonda = await res.sonda.save();
    res.json(newSonda);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getById(req, res, next) {
  let sonda;
  try {
    sonda = await Sonda.findById(req.params.id);
    if (sonda == null) {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.sonda = sonda;
  next();
}

module.exports = router;
