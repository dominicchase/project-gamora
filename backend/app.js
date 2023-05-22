// #region imports
const express = require("express");
const app = express();
const authJwt = require("./helpers/jwt");
const cors = require("cors");
const errorHandler = require("./helpers/errorHandler");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv/config");
// #endregion

const api = process.env.API_URL;

// Create the
// middleware
app.use(authJwt());
app.use(cors());
app.options("*", cors());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// routers
const cartRouter = require("./routers/cart");
app.use(`${api}/cart`, cartRouter);

const gamesRouter = require("./routers/games");
app.use(`${api}/games`, gamesRouter);

const ordersRouter = require("./routers/orders");
app.use(`${api}/orders`, ordersRouter);

const usersRouter = require("./routers/users");
app.use(`${api}/users`, usersRouter);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const orderItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

// app.post("/pay", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         const storeItem = orderItems.get(item.id);
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInCents,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.SERVER_URL}/success.html`,
//       cancel_url: `${process.env.SERVER_URL}/cancel.html`,
//     });

//     res.json({ url: session.url });
//   } catch (event) {
//     res.status(500).json({ error: event.message });
//   }

//   res.json({ url: "hi" });
// });

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
