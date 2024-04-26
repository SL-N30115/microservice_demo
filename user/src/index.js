const express = require("express");
const { databaseConnection } = require("./database");
const { PORT } = require("./config");
const expressApp = require("./express-app");

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  app.use(express.json());

  await expressApp(app);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

StartServer();
