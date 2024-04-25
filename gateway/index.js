const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", proxy("http://localhost:8001"));
app.use("/booking", proxy("http://localhost:8002"));
app.use("/payment", proxy("http://localhost:8003"));
app.use("/", proxy("http://localhost:8004")); // property

app.listen(8000, () => {
  console.log("Gateway is running on port 8000");
});
