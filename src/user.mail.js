"use strict";

var nodemailer = require("nodemailer");

class UserMail {
  async sendMail(emailId) {
    var api_key = "XXXXXXXXXXXXXXXXXXXXXXX";
    var domain = "www.mydomain.com";
    var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
    emailId = 'parveenladaf26@gmail.com';
    var data = {
      from: "parveenladaf1998@gmail.com",
      to: emailId,
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);

      console.log("mail send");
    });
  }
}

module.exports = UserMail;
