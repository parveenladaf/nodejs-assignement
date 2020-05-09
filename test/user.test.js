const assert = require("assert");
const UserRepository = require("../src/repository/user.repository");

describe("Tesing user Repository", () => {
  it("Should return user Email", async () => {
    const testObj = new UserRepository();
    const emailId = "parveenladaf12@gmail.com";
    const res = await testObj.findByEmailId("parveenladaf12@gmail.com");
    assert.equal(res[0].email_id, emailId);
  });
});
