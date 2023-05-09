// #region imports
const express = require("express");
const app = express();
const authJwt = require("./helpers/jwt");
const cors = require("cors");
const errorHandler = require("./helpers/errorHandler");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("dotenv/config");
// #endregion

const api = process.env.API_URL;

// middleware
app.use(authJwt());

app.use(cors());
app.options("*", cors());

app.use(errorHandler);
app.use(express.json());

app.use(morgan("tiny"));

// routers
const gamesRouter = require("./routers/games");
app.use(`${api}/games`, gamesRouter);

const ordersRouter = require("./routers/orders");
app.use(`${api}/orders`, ordersRouter);

const usersRouter = require("./routers/users/users");
app.use(`${api}/users`, usersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "gameshop-db",
  })
  .then(() => console.log("connected to db"));
// .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("server is running...");
});
