// #region imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/errorHandler");
require("dotenv/config");
// #endregion

const api = process.env.API_URL;

// middleware
app.use(authJwt());

app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());

app.use(errorHandler);

app.use(morgan("tiny"));

// routers
const gamesRouter = require("./routers/games");
app.use(`${api}/games`, gamesRouter);

const ordersRouter = require("./routers/orders");
app.use(`${api}/orders`, ordersRouter);

const usersRouter = require("./routers/users");
app.use(`${api}/users`, usersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "gameshop-db",
  })
  .then(() => console.log("connected to db"))
  .catch((err) => err);

app.listen(3000, () => {
  console.log("server is running...");
});
