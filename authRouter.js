const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

router.post(
  "/registration",
  [
    check(
      "username",
      `Username don't be is empty and should be more than 4 symbols`
    )
      .notEmpty()
      .isLength({ min: 4 }),
    check(
      "password",
      `Password should be more than 4 symbols and less than 10 symbols`
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;
