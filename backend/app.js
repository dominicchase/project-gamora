const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./helpers/errorHandler");
const mongoose = require("mongoose");
const morgan = require("morgan");
const verifyJwt = require("./middleware/verifyJwt");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const { corsOptions } = require("./config/corsOptions");

require("dotenv/config");

const api = process.env.API_URL;

// middleware
// app.use(cors());
app.use(credentials);
app.use(cors(corsOptions));
// app.options("*", cors());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// routers
const userRoute = require("./routes/user");
app.use(`${api}/user`, userRoute);

const gamesRoute = require("./routes/games");
app.use(`${api}/games`, gamesRoute);

app.use(verifyJwt);
const adminRoute = require("./routes/admin");
app.use(`${api}/admin`, adminRoute);

const cartRoute = require("./routes/cart");
app.use(`${api}/cart`, cartRoute);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "gameshop-db",
  })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.listen(3001, () => {
  console.log("server is running...");
});
