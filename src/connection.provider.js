'use strict'
const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

class ConnectionProvider {

    static async getConnection() {
        return new Promise(async (resolve, reject) => {
            try {

                const connection = mysql.createConnection({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    multiplestatements: true
                });
                connection.connect();
                resolve(connection);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
}

module.exports = ConnectionProvider;