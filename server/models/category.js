const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },

  categoryEnum: {
    type: String,
    required: true,
  },
});

exports.Category = mongoose.model("Category", categorySchema);
