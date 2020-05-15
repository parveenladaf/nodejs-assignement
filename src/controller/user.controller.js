"use strict";

const UserManager = require("../biz/user.manager");
const ErrorManager = require("../biz/error.manager");

const STATUS = require("../constant/status");
const HEADER = require("../constant/header");
/**
 * Authentication Controller for handling login.
 */
class UserController {
  /**
   * default constructor
   */
  constructor() {}

  async register(req, res) {
    try {
      const userManager = new UserManager();
      const result = await userManager.register(req.body);
      return res
        .status(STATUS.OK)
        .header(HEADER.CONTENT_TYPE, HEADER.JSON)
        .send(JSON.stringify(result));
    } catch (err) {
      res.status(err.status || STATUS.ERROR).send(ErrorManager.format(err));
    }
  }
}

module.exports = UserController;
