const express = require("express");

const app = express();

app.use(express.json());
app.use("/", (req, res, next) => {
  return res.status(200).json({ msg: "hello from payment" });
});

app.listen(8003, () => {
  console.log("Server is running on port 8003");
});
