const assert = require("chai").assert;
const sinon = require("sinon");

const ConnectionProvider = require("../src/connection.provider");
const UserManager = require("../src/biz/user.manager");
const UserRepository = require("../src/repository/user.repository");
const MailManager = require("../src/biz/mail.manager");

const MESSAGE = require("../src/constant/message");

describe("Tesing UserManager", () => {
  let dummyConnection;
  beforeEach(() => {
    dummyConnection = {
      beginTransaction: sinon.spy(),
      commit: sinon.spy(),
      rollback: sinon.spy(),
      query: (q, args, callback) => {
        const result = {};
        const err = null;
        callback(err, result);
      },
    };
    // Returning dummy mysql connection
    sinon.stub(ConnectionProvider, "getConnection").returns(dummyConnection);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("User exist should throw duplicate user error", async () => {
    sinon
      .stub(UserRepository.prototype, "findByEmailId")
      .returns({ email_id: "xyz@gmail.com" });

    const userManager = new UserManager();
    const userData = {
      first_name: "mdkasd",
      last_name: "njsans",
      email_id: "xyz@gmail.com",
      password: "dbjadsa",
    };
    try {
      await userManager.register(userData);
    } catch (err) {
      sinon.assert.calledOnce(dummyConnection.beginTransaction);
      sinon.assert.calledOnce(dummyConnection.rollback);
      assert.equal(err.message, MESSAGE.DUPLICATE_USER);
    }
  });

  it("Not a valid email ID / user data", async () => {
    const userManager = new UserManager();
    const userData = {
      first_name: "mdkasd",
      last_name: "njsans",
      email_id: "skasasKa",
      password: "dbjadsa",
    };
    try {
      await userManager.register(userData);
    } catch (err) {
      sinon.assert.notCalled(dummyConnection.beginTransaction);
      assert.equal(err.message, MESSAGE.VALIDATION_ERROR);
      assert.equal(
        err.errors[0].message,
        'does not conform to the "email" format'
      );
    }
  });

  it("User is valid / error while signup.", async () => {
    const userManager = new UserManager();
    const expectedError = "DB connection error.";
    sinon
      .stub(UserRepository.prototype, "findByEmailId")
      .throws(new Error(expectedError));
    const userData = {
      first_name: "parveen",
      last_name: "ladaf",
      email_id: "parveenladaf12@gmail.com",
      password: "Test@123",
    };
    try {
      await userManager.register(userData);
    } catch (err) {
      sinon.assert.calledOnce(dummyConnection.beginTransaction);
      sinon.assert.calledOnce(dummyConnection.rollback);
      assert.equal(err.message, expectedError);
    }
  });

  it("User is valid / signup done / but email not sent.", async () => {
    const userManager = new UserManager();
    const expectedError = "Failed to send email.";
    sinon
      .stub(MailManager, "sendWelcomeEmail")
      .throws(new Error(expectedError));
    sinon.stub(UserRepository.prototype, "findByEmailId").returns(null);
    const userData = {
      first_name: "parveen",
      last_name: "ladaf",
      email_id: "parveenladaf12@gmail.com",
      password: "Test@123",
    };
    try {
      await userManager.register(userData);
    } catch (err) {
      sinon.assert.calledOnce(dummyConnection.beginTransaction);
      sinon.assert.calledOnce(dummyConnection.rollback);
      assert.equal(err.message, expectedError);
    }
  });

  it("User is valid / signup done / email sent successfully..", async () => {
    const userManager = new UserManager();
    sinon.stub(MailManager, "sendWelcomeEmail").returns(true);
    sinon.stub(UserRepository.prototype, "findByEmailId").returns(null);
    const userData = {
      first_name: "parveen",
      last_name: "ladaf",
      email_id: "parveenladaf12@gmail.com",
      password: "Test@123",
    };
    await userManager.register(userData);
    sinon.assert.calledOnce(dummyConnection.beginTransaction);
    sinon.assert.calledOnce(dummyConnection.commit);
  });
});
