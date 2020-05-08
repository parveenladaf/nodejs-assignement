'use strict';
const UserController = require('./user.controller');

module.exports = {
    'auth': new UserController()
};