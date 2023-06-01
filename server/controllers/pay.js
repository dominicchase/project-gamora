const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Game } = require("../models/game");

module.exports = {
  payWithStripe: async (req, res) => {
    const { cartGames } = req.body;

    try {
      const line_items = await Promise.all(
        cartGames.map(async (cartGame) => {
          const game = await Game.findOne({ _id: cartGame.game });

          return await {
            price_data: {
              currency: "usd",
              product_data: {
                name: game.name,
              },
              unit_amount: +String(game.price * 100).split(".")[0],
            },
            quantity: cartGame.quantity,
          };
        })
      );
      console.log(line_items);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: `https://localhost:3000/cart`,
        cancel_url: `https://localhost:3000/`,
      });

      return res.json({ url: session.url });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
};
