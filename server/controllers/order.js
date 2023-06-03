const { Order } = require("../models/order");

module.exports = {
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find();

      return res.send(orders);
    } catch (error) {
      return res.status(500).json({ error: "Failed to find orders" });
    }
  },

  // TODO: change this from email to id or sum better
  getOrderByEmail: async (req, res) => {
    const { userId } = req.query;

    try {
      const order = await Order.findOne({ userId })
        .sort({ date: "descending" })
        .limit(1);

      return res.send(order);
    } catch (error) {
      return res.status(500).json({ error: "Failed to find order" });
    }
  },
};
