const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const schema = require("./schema/schema");
const app = express();

mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongodb.."))
  .catch((err) => console.error("unable to connect", err));

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
