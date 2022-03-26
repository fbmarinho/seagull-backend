const mongoose = require("mongoose");

const sondaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
});

module.exports = mongoose.model("sonda", sondaSchema);
