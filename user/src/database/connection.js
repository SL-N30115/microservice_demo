const mongoose = require("mongoose");
const { DB_URI } = require("../config");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};
