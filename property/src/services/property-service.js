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
}

module.exports = PropertyService;
