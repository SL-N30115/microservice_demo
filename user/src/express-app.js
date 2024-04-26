const cors = require("cors");
const express = require("express");
const user = require("./api/user");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  user(app);
};
