const mongoose = require("mongoose");

// activity shema
const activitySchema = new mongoose.Schema(
  {
    activity: {
      type: String,
      default: "",
    },
    specificMotion: {
      type: String,
      default: "",
    },
    metValue: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const ActivityModel = mongoose.model(
  "ActivityModel",
  activitySchema,
  "activities"
);

// exporting model
module.exports = ActivityModel;
