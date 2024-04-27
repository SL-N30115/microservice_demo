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
