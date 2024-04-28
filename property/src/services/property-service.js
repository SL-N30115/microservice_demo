const { PropertyRepository } = require("../database");
const { FormateData } = require("../utils");

class PropertyService {
  constructor() {
    this.repository = new PropertyRepository();
  }

  async CreateProperty({ title, description, price, location }) {
    try {
      const newProperty = await this.repository.CreateProperty({
        title,
        description,
        price,
        location,
      });

      return FormateData("Property created successfully", newProperty);
    } catch (error) {
      console.log(error);
      return FormateData("Error creating property");
    }
  }

  async UpdatePropertyBooking(propertyID, status) {
    try {
      const property = await this.repository.UpdatePropertyBooking(
        propertyID,
        status
      );
      return FormateData("Property booking updated", property);
    } catch (error) {
      console.log(error);
      return FormateData("Error updating property booking");
    }
  }

  async GetProperties() {
    try {
      const properties = await this.repository.GetAllProperties();
      if (properties.length < 1) {
        return FormateData("No properties found");
      }
      return FormateData({ properties: properties });
    } catch (error) {
      console.log(error);
      return FormateData("Error retrieving properties");
    }
  }

  async GetAvailableProperties() {
    try {
      const properties = await this.repository.GetAvailableProperties();
      if (properties.length < 1) {
        return FormateData("No properties found");
      }
      return FormateData({ properties: properties });
    } catch (error) {
      console.log(error);
      return FormateData("Error retrieving properties");
    }
  }

  async SubscribeEvents(payload) {
    console.log("Triggering Booking Event");

    payload = JSON.parse(payload);

    const { event, data } = payload;

    const { propertyID } = data;

    switch (event) {
      case "BOOKING_CREATED":
        this.UpdatePropertyBooking(propertyID, true);
        break;
      case "BOOKING_CANCELLED":
        this.UpdatePropertyBooking(propertyID, false);
        break;
      default:
        break;
    }
  }
}

module.exports = PropertyService;
