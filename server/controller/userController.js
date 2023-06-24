const express = require("express");
const Output = require("../utils/Output");
const userService = require("../service/userService");
const { default: mongoose } = require("mongoose");

// get users method
const getUsers = async (req, res) => {
  try {
    // calling service file to get users
    let data = await userService.getUsers();

    // returing success output, message, data
    return await Output.success(res, "Successfully get users.", data);
  } catch (e) {
    // else error
    console.log(e, "from get users controller");
    return await Output.error(res, e);
  }
};

// add user method
const addUser = async (req, res) => {
  try {
    // extracted data from body
    const { name, weight, height, sex, age } = req.body;

    // calling service method by passing data
    let data = await userService.addUser(name, weight, height, sex, age);

    // returing success output, message, data
    return await Output.success(res, `Successfully added user ${data}.`, data);
  } catch (e) {
    // else error
    console.log(e, "from get users controller");

    return await Output.error(res, e);
  }
};

// get user detail by id method
const getUserById = async (req, res) => {
  try {
    // extracted data from body and params
    const { id } = req.params;
    const { dateFor } = req.query;

    // calling service method
    let data = await userService.getUserDetailsById(id, { dateFor });

    // returing success output, message, data
    return await Output.success(
      res,
      `Successfully get user deatils for ${id}.`,
      data
    );
  } catch (e) {
    // else error
    console.log(e, "from get user by id controller");
    return await Output.error(res, e);
  }
};

// add caloriesIn for user by id
const addCaloryInForUserById = async (req, res) => {
  try {
    // extracted data from body and params
    const { id } = req.params;
    const { dateFor, foodId, portion, time } = req.body;

    // calling service method
    let data = await userService.addCaloryInForUserById(id, {
      dateFor,
      foodId,
      portion,
      time,
    });

    // return
    return await Output.success(
      res,
      `Successfully added calories in deatils for user ${id}.`,
      data
    );
  } catch (e) {
    // else error
    console.log(e, "from add calory in for user controller");

    return await Output.error(res, e);
  }
};

// add caloriesOut for user by id
const addCaloryOutForUserById = async (req, res) => {
  try {
    // extracted data from body and params
    const { id } = req.params;
    const { dateFor, activityId, duration, caloryBurnt } = req.body;

    // calling service file
    let data = await userService.addCaloryOutForUserById(id, {
      dateFor,
      activityId,
      duration,
      caloryBurnt,
    });

    // return
    return await Output.success(
      res,
      `Successfully added calories out deatils for user ${id}.`,
      data
    );
  } catch (e) {
    // else error
    console.log(e, "from add calory out for user controller");

    return await Output.error(res, e);
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  try {
    // extracted data from body
    const { id } = req.params;

    // calling service
    let data = await userService.deleteUserById(id);

    // return
    return await Output.success(
      res,
      `Successfully deleted user of id ${id}.`,
      data
    );
  } catch (e) {
    // else error
    console.log(e, "from delete user by id controller");

    return await Output.error(res, e);
  }
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  addCaloryInForUserById,
  addCaloryOutForUserById,
  deleteUserById,
};
