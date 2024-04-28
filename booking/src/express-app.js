const cors = require("cors");
const express = require("express");
const booking = require("./api/booking");
module.exports = (app, channel) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  booking(app, channel);
};
