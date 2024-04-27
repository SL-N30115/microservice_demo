const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  propertyID: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("booking", bookingSchema);
