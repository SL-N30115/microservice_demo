const userRepository = require("./repository/user-repository");

module.exports = {
  databaseConnection: require("./connection"),
  UserRepository: require("./repository/user-repository"),
};
