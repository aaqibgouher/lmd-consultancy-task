const mongoose = require("mongoose");

// food schema
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    foodGroup: {
      type: String,
      default: "",
    },
    calories: {
      type: Number,
      integer: true,
      default: 0,
    },
    fat: {
      type: Number,
      default: 0.0,
    },
    protein: {
      type: Number,
      default: 0.0,
    },
    carbohydrates: {
      type: Number,
      default: 0.0,
    },
    servingDescription: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// model
const FoodModel = mongoose.model("FoodModel", foodSchema, "foods");

// exporting model
module.exports = FoodModel;
