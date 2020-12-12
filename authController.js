const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

class authController {
  async registration(req, res) {
    try {
      const errorsValid = validationResult(req);
      if (!errorsValid.isEmpty()) {
        return res
          .status(400)
          .json({ message: `Error in registration`, errors: errorsValid });
      }

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: `User already exists!` });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();

      return res.json({ message: `User was successed created!` });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Registration error` });
    }
  }
  async login(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Login error` });
    }
  }
  async getUsers(req, res) {
    try {
      res.json("Server Users");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new authController();
