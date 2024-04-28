const { PropertyModel } = require("../model");

class PropertyRepository {
  async CreateProperty({ title, description, price, location }) {
    const property = new PropertyModel({
      title,
      description,
      price,
      location,
    });

    const propertyResult = await property.save();

    return propertyResult;
  }

  async GetAllProperties() {
    const properties = await PropertyModel.find();

    return properties;
  }

  async GetAvailableProperties() {
    const properties = await PropertyModel.find({ booked: false });

    return properties;
  }

  async UpdatePropertyBooking(id, status) {
    const property = await PropertyModel.findById(id);
    property.booked = status;

    const updatedProperty = await property.save();

    return updatedProperty;
  }

  async FindPropertyById(id) {
    const existingProperty = await PropertyModel.findById(id);

    return existingProperty;
  }

  async RemovePropertyById(id) {
    const existingProperty = await PropertyModel.findByIdAndDelete(id);

    return existingProperty;
  }
}

module.exports = PropertyRepository;
