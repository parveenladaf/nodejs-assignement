"use strict";
const UserRepository = require("../repository/user.repository");
const connProvider = require("../connection.provider");
const SendMail = require("../user.mail");

class UserManager {
  async saveUserAndSendEmail(userData) {
    const connection = await connProvider.getConnection();

    connection.beginTransaction();

    try {
      const userRepositoryObj = new UserRepository();
      const result = await userRepositoryObj.saveUserData(userData, connection);
      if ((result.affectedRows = 1)) {
        const userMailObj = new SendMail();
        const result = await userMailObj.sendMail(userData.email_id);
        if (result) {
          connection.commit();
        } else {
          connection.rollback();
        }
      }
    } catch (error) {
      connection.rollback();
      throw error;
    }
  }
}

module.exports = UserManager;
