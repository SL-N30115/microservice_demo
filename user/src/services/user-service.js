const UserRepository = require("../database/repository/user-repository");
const {
  ValidatePassword,
  GenerateSignature,
  GeneratePassword,
  FromateData,
  FormateData,
} = require("../utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async Signin({ email, password }) {
    const existingUser = await this.repository.FindUserByEmail(email);

    if (existingUser) {
      const validPassword = await ValidatePassword(
        password,
        existingUser.password
      );

      if (validPassword) {
        const token = await GenerateSignature({
          email: existingUser.email,
          id: existingUser._id,
        });
        return FormateData({ id: existingUser._id, token });
      } else {
        return FormateData("invalid password" + password);
      }
    }

    return FormateData("failed to login");
  }

  async Signup({ username, firstname, lastname, email, password }) {
    const existingUser = await this.repository.FindUserByEmail(email);

    if (!existingUser) {
      let userPassword = await GeneratePassword(password);
      password = userPassword;
      const newUser = await this.repository.CreateUser({
        username,
        firstname,
        lastname,
        email,
        password,
      });

      return FormateData({ id: newUser._id });
    }

    return FormateData("error creating user");
  }
}

module.exports = UserService;
