const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItem");

module.exports = {
  createOrder: async (req, res) => {
    const { body } = req;

    console.log(body.orderItems);

    const ids = Promise.all(
      body.orderItems.map(async ({ product, quantity }) => {
        var orderItem = new OrderItem({
          product,
          quantity,
        });

        orderItem = await orderItem.save();

        return orderItem._id;
      })
    );

    const orderIds = await ids;

    console.log(orderIds);

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

  getOrder: async (req, res) => {
    const orderList = await Order.find();

    if (!orderList) {
      res.status(500).json({ success: false });
    }

    res.send(orderList);
  },
};
