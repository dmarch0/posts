const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const graphqlRoute = require("express-graphql");

//initialize app
const app = express();

//apply middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlRoute({
    schema: "",
    rootValue: {},
    graphiql: process.env.NODE_ENV === "production" ? false : true
  })
);

//port config
const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}${process.env.MONGO_PASSWORD}@cluster0-o6jo9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  });
