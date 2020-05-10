"use strict";

const UserRepository = require("../repository/user.repository");
const ConnectionProvider = require("../connection.provider");
const UserSchema = require("../schema/user.schema");

const MailManager = require("./mail.manager");
const LogManager = require("../biz/log.manager");

const DuplicateEntityError = require("../exception/duplicate-entity.error");
const ValidationError = require("../exception/validation.error");

const MESSAGE = require("../constant/message");

var Validator = require("jsonschema").Validator;
var schemaValidator = new Validator();
class UserManager {
  constructor() {
    this.connection = ConnectionProvider.getConnection();
    this.userRepository = new UserRepository(this.connection);
    this.logger = LogManager.getLogger();
  }

  async register(userData) {
    try {
      this.logger.info(
        `Recieved user registeration request with ${JSON.stringify(userData)}`
      );
      // If results.errors is an empty array, then this validated successfully.
      this.logger.info("Validating userData");
      var validationResult = schemaValidator.validate(userData, UserSchema);
      this.logger.info(
        `Validation completed with result ${validationResult.valid}`
      );
      if (validationResult.valid) {
        this.logger.info(`Begining transaction for email ${userData.email_id}`);
        this.connection.beginTransaction();
        this.logger.info(
          `Checking if user exist for email ${userData.email_id}`
        );
        const user = await this.userRepository.findByEmailId(userData.email_id);
        if (user) {
          this.logger.warn(`User already exist for email ${userData.email_id}`);
          throw new DuplicateEntityError(MESSAGE.DUPLICATE_USER);
        }

        this.logger.info(`Saving userData for email ${userData.email_id}`);
        let result = await this.userRepository.save(userData);
        this.logger.info(`Saved user for email ${userData.email_id}`);

        this.logger.info(`Sending mail for given ${userData.email_id}`);
        const isMailSent = await MailManager.sendWelcomeEmail(userData);
        if (isMailSent) {
          this.logger.info(`Mail sent for email id ${userData.email_id}`);
          this.connection.commit();
          this.logger.info(
            `Commited transaction for email ${userData.email_id}`
          );
          result = {
            message: MESSAGE.USER_REGISTERED,
            user_id: result.insertId,
            email_id: userData.email_id,
          };
          this.logger.info(`${JSON.stringify(result)}`);
          return result;
        }
        this.logger.info(
          `Rolling back transaction for email ${userData.email_id}`
        );
        this.connection.rollback();
      } else {
        this.logger.error(
          `Validation failed for email ${userData.email_id} with errors ${validationResult.errors}`
        );
        throw new ValidationError(
          MESSAGE.VALIDATION_ERROR,
          validationResult.errors
        );
      }
    } catch (error) {
      this.logger.error(
        `Mail not sent for ${userData.email_id} email id because ${error.message}`
      );
      this.connection.rollback();
      throw error;
    }
  }

  async testUser(emailId) {
    return await this.userRepository.findByEmailId(emailId);
  }
}
module.exports = UserManager;
