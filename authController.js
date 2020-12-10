const User = require('./models/User')
const Role = require('./models/Role')

class authController {
  async registration(req, res) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
  async login(req, res) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
  async getUsers(req, res) {
    try {
      res.json("Server Users")
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new authController();
