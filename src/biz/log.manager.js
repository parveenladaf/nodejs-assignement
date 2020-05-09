"use strict";

const winston = require("winston");
require("winston-daily-rotate-file");

let LOGGER;

class LogManager {
  constructor() {
    const logConfiguration = {
      transports: [
        new winston.transports.DailyRotateFile({
          filename: "logs/application-%DATE%.log",
          datePattern: "YYYY-MM-DD-HH",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        }),
      ],
    };
    this.logger = winston.createLogger(logConfiguration);
  }

  info(msg) {
    this.logger.info(msg);
  }

  debug(msg) {
    this.logger.debug(msg);
  }

  error(msg) {
    this.logger.error(msg);
  }

  warn(msg) {
    this.logger.warn(msg);
  }

  static getLogger() {
    if (LOGGER) {
      return LOGGER;
    }
    LOGGER = new LogManager();
    return LOGGER;
  }
}

module.exports = LogManager;
