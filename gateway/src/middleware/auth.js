const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const validateSignature = async (req, res, next) => {
  try {
    const signature = req.headers.authorization;
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

module.exports = validateSignature;
