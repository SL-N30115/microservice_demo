const { BookingModel } = require("../model");

class BookingRepository {
  async CreateBooking({ userID, propertyID }) {
    const booking = new BookingModel({
      userID,
      propertyID,
    });

    const bookingResult = await booking.save();
    // update the property status to booked
    return bookingResult;
  }

  async GetBookingsByUserId(userID) {
    const bookings = await BookingModel.find({ userID });
    if (bookings.length === 0) {
      return null;
    }
    return bookings;
  }

  async CancelBooking(bookingId) {
    const booking = await BookingModel.findById(bookingId);
    booking.status = "cancelled";
    // update the property status to available
    const updatedBooking = await booking.save();
    return updatedBooking;
  }
}

module.exports = BookingRepository;
