const PropertyService = require("../services/property-service");

module.exports = (app) => {
  const service = new PropertyService();

  app.post("/property", async (req, res, next) => {
    const { title, description, price, location } = req.body;
    const { data } = await service.CreateProperty({
      title,
      description,
      price,
      location,
    });
    res.json(data);
  });

  app.get("/property", async (req, res, next) => {
    const { data } = await service.GetProperties();
    res.json(data);
  });
};
