"use strict";

var mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const MESSAGE = require("../constant/message");

class MailManager {
  static async sendWelcomeEmail(userObj) {
    try {
      var data = {
        from: process.env.FROM_EMAIL,
        to: userObj.email_id,
        subject: MESSAGE.WELCOME_EMAIL_SUBJECT,
        text: MESSAGE.WELCOME_EMAIL_BODY,
      };

      let result = await mailgun.messages().send(data);
      if (result) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MailManager;
