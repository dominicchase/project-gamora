const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
const { Cart } = require("../models/cart");
const { CartGame } = require("../models/cartGame");
const { Game } = require("../models/game");

module.exports = {
  paymentIntent: async (req, res) => {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("PaymentIntent was successful!");
        break;

      case "checkout.session.completed":
        // CONVOLUTED CART CLEANUP
        // TODO: before deleting, add to completed orders
        const cartId = event.data.object.metadata.cartId;
        const cart = await Cart.findById(cartId).populate({
          path: "games",
          populate: "game",
        });

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

        // const lineItems = await stripe.checkout.sessions.listLineItems(
        //   event.data.object.id
        // );
        console.log("CheckoutSession was completed!");
        // console.log(lineItems);
        break;

      // case "payment_method.attached":
      //   const paymentMethod = event.data.object;
      //   console.log("PaymentMethod was attached to a Customer!");
      //   break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  },
};
