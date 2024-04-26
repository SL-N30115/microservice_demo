const express = require("express");
const { PORT } = require("./config");

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use("/", (req, res, next) => {
    return res.status(200).json({ msg: "hello from property" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
