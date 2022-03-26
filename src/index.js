if (!process.env.NODE_ENV) {
  require("dotenv").config();
}
const port = process.env.PORT; //Use this for HEROKU
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Atlas"));

const sondasRouter = require("./routes/sondas");
app.use("/sondas", sondasRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.listen(port, () => console.log(`Port: ${port}`));
