"use strict";

class ErrorManager {
  static format(err) {
    if (!err) {
      throw new Error("err argument is required to set the error.");
    }
    const result = {
      message: err.message || err,
    };
    return result;
  }
}

module.exports = ErrorManager;
