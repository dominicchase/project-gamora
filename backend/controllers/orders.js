const { Game } = require("../models/game");
const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItem");

module.exports = {
  createOrder: async (req, res) => {
    const { body } = req;

    const ids = Promise.all(
      body.orderItems.map(async ({ game, quantity }) => {
        var orderItem = new OrderItem({
          game,
          quantity,
        });

        orderItem = await orderItem.save();

        return orderItem._id;
      })
    );

    const orderIds = await ids;

    const totalPrice = await body.orderItems.reduce(
      async (accumulator, orderItem) => {
        const game = await Game.findById(orderItem.game);
        return (await accumulator) + game.price * orderItem.quantity;
      },
      0
    );

    var order = new Order({
      city: body.city,
      country: body.country,
      orderItems: orderIds,
      phone: body.phone,
      price: totalPrice,
      shippingAddress1: body.shippingAddress1,
      shippingAddress2: body.shippingAddress2,
      status: body.status,
      user: body.user,
      zip: body.zip,
    });

    order = await order.save();

    if (!order) {
      res.status(400).send({ success: false });
    }

    res.send(order);
  },

  deleteOrder: async (req, res) => {
    Order.findByIdAndRemove(req.query.id)
      .then(async (order) => {
        if (order) {
          await order.orderItems.forEach(async (orderItem) => {
            await OrderItem.findByIdAndRemove(orderItem);
          });

          return res
            .status(200)
            .json({ success: true, message: "Deleted order..." });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Failed to delete order..." });
        }
      })
      .catch((err) =>
        res
          .status(err.status)
          .json({ success: false, message: err.inner.message })
      );
  },

  getOrderById: async (req, res) => {
    const order = await Order.findById(req.query.id)
      .populate("user")
      .populate({ path: "orderItems", populate: "game" });

    if (!order) {
      res.status(500).json({ success: false });
    }

    res.send(order);
  },

  getOrders: async (req, res) => {
    const orderList = await Order.find()
      .populate("user")
      .populate("orderItems")
      .sort({ date: -1 });

    if (!orderList) {
      res.status(500).json({ success: false });
    }

    res.send(orderList);
  },

  getUserOrders: async (req, res) => {
    var userOrderList = await Order.find({ user: req.query.id })
      .populate("user")
      .populate({ path: "orderItems", populate: "game" });

    if (!userOrderList) {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch orders..." });
    }

    res.send(userOrderList);
  },

  updateOrder: async (req, res) => {
    const order = await Order.findByIdAndUpdate(
      req.query.id,
      {
        status: req.body.status,
      },
      { new: true }
    )
      .populate("user")
      .populate({ path: "orderItems", populate: "game" });

    if (!order) {
      res.status(400).json({ success: false });
    }

    res.send(order);
  },
};
