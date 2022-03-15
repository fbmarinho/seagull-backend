const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
router.get("/", (req, res) => {
  res.send("Index of Sondas");
});

// define the about route
router.get("/:id", (req, res) => {
  var param = req.params;
  res.json({ id: param.id, nome: "NS47" });
});

module.exports = router;
