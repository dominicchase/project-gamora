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

    var order = new Order({
      city: body.city,
      country: body.country,
      orderItems: orderIds,
      phone: body.phone,
      price: body.price,
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

  getOrderById: async (req, res) => {
    console.log(req.query);
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
};
