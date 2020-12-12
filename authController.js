const User = require("./models/User");
const Role = require("./models/Role");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "12h" });
};

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
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Invalid password` });
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.json({ token, message: `Successe!` });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Login error` });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new authController();
