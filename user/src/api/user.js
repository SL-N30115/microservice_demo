const UserService = require("../services/user-service");

module.exports = (app) => {
  const service = new UserService();

  app.post("/signup", async (req, res, next) => {
    const { username, firstname, lastname, email, password } = req.body;
    const { data } = await service.Signup({
      username,
      firstname,
      lastname,
      email,
      password,
    });
    res.json(data);
  });

  app.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    const { data } = await service.Signin({ email, password });
    res.json(data);
  });
};
