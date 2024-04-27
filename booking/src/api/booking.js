const BookingService = require("../services/booking-service");

module.exports = (app) => {
  const bookingService = new BookingService();

  app.post("/", async (req, res, next) => {
    const { userID, propertyID } = req.body;
    const { data } = await bookingService.CreateBooking({
      propertyID,
      userID,
    });
    res.json(data);
  });

  app.get("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    const { data } = await bookingService.GetBookingsByUserId(userId);
    res.json(data);
  });

  app.delete("/:bookingId", async (req, res, next) => {
    const { bookingId } = req.params;
    const { data } = await bookingService.CancelBooking(bookingId);
    res.json(data);
  });
};
