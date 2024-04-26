const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const { PORT } = require("./config");
const validateSignature = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", proxy("http://localhost:8001"));
app.use("/booking", validateSignature, proxy("http://localhost:8002"));
app.use("/", proxy("http://localhost:8004")); // property

app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});
