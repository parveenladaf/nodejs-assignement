'use strict'

class ValidationError extends Error {

    constructor(message) {
        super(message);
        this.status = 400;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = ValidationError;