"use strict";

const UserRepository = require("../repository/user.repository");
const UserManager = require("../biz/user.manager");
const LoginSchema = require("../schema/login.schema");
const ErrorLog = require("../logs/error.log");

var Validator = require("jsonschema").Validator;
var schemaValidator = new Validator();

class UserLogin {
  async login(userData) {
    try {
      var msg;
      const ErrorLogObj = new ErrorLog();
      // If results.errors is an empty array, then this validated successfully.
      var results = schemaValidator.validate(userData, LoginSchema.LoginSchema);
      if (results.valid) {
        const userRepositoryObj = new UserRepository();
        const result = await userRepositoryObj.getUserData(userData.email_id);
        if (result && result.length > 0) {
          var msg = "User Already Exist";
          await ErrorLogObj.createJsonForError(msg);
        } else {
          const UserManagerObj = new UserManager();
          return await UserManagerObj.saveUserAndSendEmail(userData);
        }
      } else {
        msg = "Validation Error";
        await ErrorLogObj.createJsonForError(msg);
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserLogin;
