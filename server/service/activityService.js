const ActivityModel = require("../models/ActivityModel");

// get activities
const getActivities = async () => {
  return await ActivityModel.find({});
};

// get activity by id
const getActivityById = async (acitvityId) => {
  const activity = await ActivityModel.findById(acitvityId);

  return activity;
};

// export
module.exports = {
  getActivities,
  getActivityById,
};
