const mongoose = require("mongoose");
const { UserModel } = require("../model");

class UserRepository {
  async CreateUser({ username, firstname, lastname, email, password }) {
    const user = new UserModel({
      username,
      firstname,
      lastname,
      email,
      password,
    });

    const userResult = await user.save();

    return userResult;
  }

  async FindUserByEmail(email) {
    const existingUser = await UserModel.findOne({ email: email });

    return existingUser;
  }

  async FindUserById(id) {
    const existingUser = await UserModel.findById(id);

    return existingUser;
  }
}

module.exports = UserRepository;
