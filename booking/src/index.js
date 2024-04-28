const express = require("express");
const { databaseConnection } = require("./database");
const { PORT } = require("./config");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");

const startServer = async () => {
  const app = express();

  await databaseConnection();

  app.use(express.json());

  const channel = await CreateChannel();

  await expressApp(app, channel);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
