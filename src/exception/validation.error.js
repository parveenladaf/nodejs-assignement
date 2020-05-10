'use strict'

class ValidationError extends Error {

    constructor(message, errors) {
        super(message);
        this.errors = errors;
        this.status = 400;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = ValidationError;