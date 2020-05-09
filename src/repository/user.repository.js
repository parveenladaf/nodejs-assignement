"use strict";

const util = require("util");

const ConnectionProvider = require("../connection.provider");

class UserRepository {
  constructor(connection) {
    this.connection = connection;
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  async findByEmailId(emailId) {
    try {
      const user = await this.query(
        `select email_id from user_data where email_id = ? limit 1;`,
        [emailId]
      );
      return user;
    } catch (err) {
      throw err;
    }
  }

  async save(user) {
    try {
      const result = await this.query(`insert into user_data set ?;`, [user]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserRepository;
