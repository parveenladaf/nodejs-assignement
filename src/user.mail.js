"use strict";

const ErrorLog = require("./logs/error.log");

class UserMail {
  async sendMail(emailId) {
    return new Promise(async (resolve, reject) => {
      try {
        var api_key = "911e33743c09321aa015210a8abb6561-0afbfc6c-f3d371d5";
        var domain = "sandbox65169e6b16424bf7875a8c6db9d74518.mailgun.org";
        var mailgun = require("mailgun-js")({
          apiKey: api_key,
          domain: domain,
        });
        var data = {
          from: "parveenladaf26@gmail.com",
          to: emailId,
          subject: "Welcome To IorTa",
          text: "You has been login successfully!",
        };

        var msg;
        await mailgun.messages().send(data, function (err, res) {
          if (res.id) {
            const ErrorLogObj = new ErrorLog();
            msg = err.message;
            ErrorLogObj.createJsonForError(msg);
            resolve(res);
          }else {
            reject(err);
          }
        }); 
      } catch (error) {
        throw error;
      }
    });
  }
}

module.exports = UserMail;
