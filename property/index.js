const express = require("express");

const app = express();

app.use(express.json());
app.use("/", (req, res, next) => {
  return res.status(200).json({ msg: "hello from property" });
});

app.listen(8004, () => {
  console.log("Server is running on port 8004");
});
