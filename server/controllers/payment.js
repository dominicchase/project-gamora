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
        // TODO: do i need this?
        metadata: {
          // userId:
          cartId: theCartId,
        },
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "usd",
              },
              display_name: "Next day air",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
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

  getHistory: async (req, res) => {},
};
