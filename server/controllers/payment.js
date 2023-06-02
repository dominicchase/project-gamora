const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
const { CartGame } = require("../models/cartGame");

module.exports = {
  pay: async (req, res) => {
    const cartGames = req.body;

    let theCartId;
    try {
      const line_items = await Promise.all(
        cartGames.map(async (id) => {
          const cartGame = await CartGame.findOne({
            _id: id,
          }).populate("game");

          theCartId = cartGame.cartId;

          return await {
            price_data: {
              currency: "usd",
              product_data: {
                name: cartGame.game.name,
              },
              unit_amount: +String(cartGame.game.price * 100).split(".")[0],
            },
            quantity: cartGame.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: `https://localhost:3000/cart`,
        cancel_url: `https://localhost:3000/`,
        metadata: {
          cartId: theCartId,
        },
        // custom_fields: [
        //   {
        //     key: theCartId,
        //     label: {
        //       type: "custom",
        //       custom: "Thing",
        //     },
        //     type: "text",
        //   },
        // ],
      });

      return res.json({ url: session.url });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
};
