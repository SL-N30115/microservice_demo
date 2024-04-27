const BookingRepository = require("../database/repository/booking-repository");
const { FormateData } = require("../utils");

class BookingService {
  constructor() {
    this.repository = new BookingRepository();
  }

  async CreateBooking({ userID, propertyID }) {
    try {
      const newBooking = await this.repository.CreateBooking({
        userID,
        propertyID,
      });
      return FormateData("Booking created successfully", newBooking);
    } catch (error) {
      console.log(error);
      return FormateData("Error creating booking");
    }
  }

  async GetBookingsByUserId(userID) {
    try {
      const bookings = await this.repository.GetBookingsByUserId(userID);
      if (!bookings) {
        return FormateData("No bookings found", null);
      }
      return FormateData(bookings);
    } catch (error) {
      console.log(error);
      return FormateData("Error getting bookings");
    }
  }

  async CancelBooking(bookingId) {
    try {
      const updatedBooking = await this.repository.CancelBooking(bookingId);
      return FormateData(updatedBooking);
    } catch (error) {
      console.log(error);
      return FormateData("Error cancelling booking");
    }
  }
}

module.exports = BookingService;
