"use strict";
const connProvider = require("../connection.provider");

class UserRepository {
  async getUserData(emailId) {
    return new Promise(async (resolve, reject) => {
      try {
        const connection = await connProvider.getConnection();
        connection.query(
          `SELECT * FROM user_data where email_id = ?`,
          [emailId],
          async (err, result) => {
            if (err) {
              reject(err);
            }
            if (result) {
              resolve(result);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async saveUserData(param, connection) {
    return new Promise(async (resolve, reject) => {
      try {
        connection.query(
          `insert into user_data (first_name, last_name, email_id, password)
           values (?, ?, ?, ?)`,
          [param.first_name, param.last_name, param.email_id, param.password],
          async (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = UserRepository;
