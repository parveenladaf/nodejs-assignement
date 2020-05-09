"use strict";
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

class ConnectionProvider {
  static getConnection() {
    try {
      const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      return connection;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ConnectionProvider;
