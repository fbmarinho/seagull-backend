if (!process.env.NODE_ENV) {
  require("dotenv").config();
}
const sondas = require("./Routes/sonda");
const MongoClient = require("mongodb").MongoClient;

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
  MongoClient.connect(
    "mongodb+srv://backend:cu8iwpR2bbiSjwpM@seagull.goppk.mongodb.net/db?retryWrites=true&w=majority",
    function (err, client) {
      if (err) throw err;

      var db = client.db("db");

      db.collection("sondas").findOne({}, function (findErr, result) {
        if (findErr) throw findErr;
        console.log(result);
        res.json(result);
        client.close();
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
