const PropertyService = require("../services/property-service");
const { SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
  const service = new PropertyService();

  SubscribeMessage(channel, service);

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

  app.get("/property/available", async (req, res, next) => {
    const { data } = await service.GetAvailableProperties();
    res.json(data);
  });
};
