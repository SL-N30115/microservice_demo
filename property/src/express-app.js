const cors = require("cors");
const express = require("express");
const property = require("./api/property");

module.exports = (app, channel) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  property(app, channel);
};
