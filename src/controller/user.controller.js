"use strict";
const UserLogin = require("../biz/user.login");

/**
 * Authentication Controller for handling login.
 */
class UserController {
  async login(req, res) {
    // If request content is not in json then return error.
    if (!req.body) {
      res.status(400).send("Bad Request");
      console.log(req.body);
    }
    try {
      const userObj = new UserLogin();
      const result = await userObj.login(req.body);
      if (result) {
        return res.send({
          success: true,
          message: "User has been login successfully",
        });
      }
      res.status(400).send("Bad Request");
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  }
}

module.exports = UserController;
