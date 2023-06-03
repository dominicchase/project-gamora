// const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
const { Cart } = require("../models/cart");
const { CartGame } = require("../models/cartGame");
const { Game } = require("../models/game");
const { Order } = require("../models/order");

module.exports = {
  paymentIntent: async (req, res) => {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const {
          amount_total,
          amount_subtotal,
          created,
          customer_details,
          shipping,
          total_details,
        } = event.data.object;

        console.log(event.data);

        try {
          const cartId = event.data.object.metadata.cartId;

          const cart = await Cart.findById(cartId).populate({
            path: "games",
            populate: "game",
          });

          const items = await Promise.all(
            cart.games.map(async (game) => {
              const cartGame = await CartGame.findById(game._id).populate(
                "game"
              );
              return {
                game: cartGame.game.name,
                image: cartGame.game.image,
                price: cartGame.game.price,
                quantity: cartGame.quantity,
              };
            })
          );

          const order = new Order({
            userId: event.data.object.metadata.userId,
            date: Date(created),
            customer: {
              name: shipping.name,
              email: customer_details.email,
              address: shipping.address,
            },
            billing: {
              amountSubtotal: amount_subtotal / 100,
              amountDiscount: total_details.amount_discount / 100,
              amountShipping: total_details.amount_shipping / 100,
              amountTax: total_details.amount_tax / 100,
              amountTotal: amount_total / 100,
            },
            items,
          });

          await order.save();

          const cartGames = await Promise.all(
            cart.games.map(
              async (game) => await CartGame.findById(game._id).populate("game")
            )
          );

          for (var i = 0; i < cartGames.length; i++) {
            const cartGame = cartGames[i];

            const game = await Game.findById(cartGame.game);

            if (game.numInStock - cartGame.quantity === 0) {
              await Game.findByIdAndDelete(game._id);
            } else {
              await Game.findByIdAndUpdate(game._id, {
                $inc: { numInStock: -cartGame.quantity },
              });
            }

            await CartGame.findByIdAndDelete(cartGame._id);
          }

          await Cart.findByIdAndDelete(cartId);

          console.log("CheckoutSession was completed!");
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  },
};
