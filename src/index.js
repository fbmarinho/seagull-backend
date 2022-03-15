if (!process.env.NODE_ENV) {
  require("dotenv").config();
}
const sondas = require("./Routes/sonda");

const express = require("express");
const app = express();
const port = process.env.PORT;

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger); //Middleware

app.use("/sondas", sondas);

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
