"use strict";

class ErrorManager {
  static format(err) {
    if (!err) {
      throw new Error("err argument is required to set the error.");
    }

    const result = {
      message: err.message || err,
    };

    if (
      typeof err == "object" &&
      err.constructor.name == "ValidationError" &&
      Object.keys(err.errors).length > 0
    ) {
      result["errors"] = err.errors;
    }
    return result;
  }
}

module.exports = ErrorManager;
