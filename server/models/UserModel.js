const mongoose = require("mongoose");

// caloriesIn schema
const caloryInSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodModel",
      required: true,
    },
    portion: {
      type: Number,
      required: true,
    },
    // breakfast, lunch, snacks, dinner
    time: {
      type: String,
      enum: ["breakfast", "lunch", "snacks", "dinner"],
      required: true,
    },
    dateFor: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// calories out schema
const caloryOutSchema = new mongoose.Schema(
  {
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActivityModel",
      required: true,
    },
    // in hour
    duration: {
      type: Number,
      required: true,
    },
    // number
    caloryBurnt: {
      type: Number,
      required: true,
    },
    dateFor: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// net calories
const netCalorieSchema = new mongoose.Schema(
  {
    totalCalories: {
      type: Number,
      required: true,
    },
    bmrCalories: {
      type: Number,
      required: true,
    },
    difference: {
      type: Number,
      required: true,
    },
    dateFor: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // in kg
    weight: {
      type: Number,
      required: true,
    },
    // in cm
    height: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      required: true,
    },
    caloriesIn: [caloryInSchema],
    caloriesOut: [caloryOutSchema],
    netCalories: [netCalorieSchema],
  },
  { timestamps: true }
);

// users is the collection
const UserModel = mongoose.model("UserModel", userSchema, "users");

// exporting model
module.exports = UserModel;
