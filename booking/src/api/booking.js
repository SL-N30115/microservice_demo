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

      const payload = await bookingService.GetBookingPayLoad(
        propertyID,
        "BOOKING_CREATED"
      );

      PublishMessage(channel, PROPERTY_SERVICE, JSON.stringify(payload));

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
    const payload = await bookingService.GetBookingPayLoad(
      propertyID,
      "BOOKING_CANCELLED"
    );

    PublishMessage(channel, PROPERTY_SERVICE, JSON.stringify(payload));
    res.json(data);
  });
};
