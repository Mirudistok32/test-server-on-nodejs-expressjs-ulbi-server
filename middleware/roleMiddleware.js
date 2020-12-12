const { secret } = require("../config");
const jwt = require("jsonwebtoken");

module.exports = (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: `Not token` });
      }
      const { roles: userRoles } = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: `No access` });
      }
      next();
    } catch (error) {
      console.log(error);

      return res.status(403).json({ message: `User not authorization` });
    }
  };
};
