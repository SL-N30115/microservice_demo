const express = require("express");
const { databaseConnection } = require("./database");
const { PORT } = require("./config");

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  app.use(express.json());
  app.use("/", (req, res, next) => {
    return res.status(200).json({ msg: "hello from user" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

StartServer();
