const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

//Utility function
module.exports.GeneratePassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports.ValidatePassword = async (inputPassword, savedPassword) => {
  return await bcrypt.compare(inputPassword, savedPassword);
};

module.exports.GenerateSignature = async (payLoad) => {
  try {
    return await jwt.sign(payLoad, JWT_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], JWT_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    return new Error("Data not found");
  }
};
