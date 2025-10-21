const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    enum: ["Emergency", "Family", "Friends", "Work", "Services"],
  },
});

const categoryModel = model("category", categorySchema);

module.exports = categoryModel;
