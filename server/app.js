const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const verifyJwt = require("./middleware/verifyJwt");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const { corsOptions } = require("./config/corsOptions");

require("dotenv/config");

const api = process.env.API_URL;
const PORT = process.env.PORT || 8080;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routers
const userRoute = require("./routes/user");
app.use(`${api}/user`, userRoute);

const gamesRoute = require("./routes/games");
app.use(`${api}/games`, gamesRoute);

const stripeRoute = require("./routes/stripe");
app.use(`${api}/stripe`, stripeRoute);

app.use(verifyJwt);
const adminRoute = require("./routes/admin");
app.use(`${api}/admin`, adminRoute);

const cartRoute = require("./routes/cart");
app.use(`${api}/cart`, cartRoute);

const paymentRoute = require("./routes/payment");
app.use(`${api}/pay`, paymentRoute);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useUnifiedTopology: true, // For Mongoose 5 only. Remove for Mongoose 6+
    serverSelectionTimeoutMS: 1000, // Defaults to 30000 (30 seconds)
    useNewUrlParser: true,
    dbName: "gameshop-db",
  })
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
