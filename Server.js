const express = require("express");
const graphqlHTTP = require("express-graphql");
const data = require("./data/data.js");
const cors = require("cors");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { bodyParserGraphQL } = require("body-parser-graphql");
var bodyParser = require("body-parser");

app.use("*", cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors());

//https://www.youtube.com/watch?v=DU77lbBPfBI

//connect to database``
mongoose.connect("mongodb://aaron:Makai645!@ds149056.mlab.com:49056/ninja");
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
});

//GRAPHQL

//allow cross-origin access
app.use("*", cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors());
app.use(bodyParserGraphQL());

app.use(
  "/ninja",
  [bodyParser.json()],
  graphqlHTTP(req => {
    return {
      schema: data,
      graphiql: true
    };
  })
);

//serve statis assets if in production

app.listen(4000);
console.log("app running on port ", 4000);
