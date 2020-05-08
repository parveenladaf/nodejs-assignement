"use strict";

const winston = require("winston");

class ErrorLog {
  async createJsonForError(msg) {
    const logConfiguration = {
      transports: [
        new winston.transports.File({
          filename: "src/logs/example.log",
        }),
      ],
    };

    // Create the logger
    const logger = winston.createLogger(logConfiguration);
    logger.info(msg);
  }
}

module.exports = ErrorLog;
