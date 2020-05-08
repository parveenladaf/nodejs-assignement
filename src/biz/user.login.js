"use strict";

const UserRepository = require("../repository/user.repository");
const UserManager = require("../biz/user.manager");
const LoginSchema = require("../schema/login.schema");

var Validator = require("jsonschema").Validator;
var schemaValidator = new Validator();

class UserLogin {
  async login(userData) {
    // If results.errors is an empty array, then this validated successfully.
    var results = schemaValidator.validate(userData, LoginSchema.LoginSchema);
    if (results.valid) {
      const userRepositoryObj = new UserRepository();
      const result = await userRepositoryObj.getUserData(userData.email_id);
      if (result && result.length > 0) {
        return new Error("user already exist")
      } else {
        const UserManagerObj = new UserManager();
        const result = await UserManagerObj.saveUserAndSendEmail(userData);
      }
    }
    console.log(results.valid);
  }
}

module.exports = UserLogin;
