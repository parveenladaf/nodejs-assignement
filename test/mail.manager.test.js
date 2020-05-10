const assert = require("assert");

const MailManager = require("../src/biz/mail.manager");

describe("Tesing mail manager", () => {
  it(" - user is valid / signup done / but email not sent.", async () => {
    const userData = {
      first_name: "mdkasd",
      last_name: "njsans",
      email_id: "parveenladaf@gmail.com",
      password: "dbjadsa",
    };
    const expectedError = "Too many messages queued";
    try {
      await MailManager.sendWelcomeEmail(userData);
    } catch (err) {
      assert.throws(() => {
        throw err.message;
      }, /exposed account credentials/);
    }
  });
});
