const { BOOKING_SERVICE, PROPERTY_SERVICE } = require("../config");
const BookingService = require("../services/booking-service");
const { PublishMessage } = require("../utils");

module.exports = (app, channel) => {
  const bookingService = new BookingService();

  app.post("/", async (req, res, next) => {
    try {
      const { userID, propertyID } = req.body;
      const { data } = await bookingService.CreateBooking({
        propertyID,
        userID,
      });

      PublishMessage(channel, PROPERTY_SERVICE, JSON.stringify(data));

      res.json(data);
    } catch (error) {}
  });

  app.get("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    const { data } = await bookingService.GetBookingsByUserId(userId);
    res.json(data);
  });

  app.delete("/:bookingId", async (req, res, next) => {
    const { bookingId } = req.params;
    const { data } = await bookingService.CancelBooking(bookingId);
    PublishMessage(channel, PROPERTY_SERVICE, JSON.stringify(data));
    res.json(data);
  });
};
