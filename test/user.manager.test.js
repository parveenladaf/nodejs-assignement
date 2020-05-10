const assert = require("assert");
const sinon = require("sinon");

const UserManager = require("../src/biz/user.manager");
const UserRepository = require("../src/repository/user.repository");

describe("Tesing user Manager", () => {
  const userManager = new UserManager();

  it("Not a valid email ID/ user data", async () => {
    const userData = {
      first_name: "mdkasd",
      last_name: "njsans",
      email_id: "skasasKa",
      password: "dbjadsa",
    };
    const errors = [
      {
        property: "instance.email_id",
        message: 'does not conform to the "email" format',
        schema: { type: "string", format: "email", description: "email" },
        instance: "skasasKa",
        name: "format",
        argument: "email",
        stack: 'instance.email_id does not conform to the "email" format',
      },
    ];
    try {
      await userManager.register(userData);
    } catch (err) {
      assert.throws(() => {
        throw err.message;
      }, /Validation Error/);
    }
  });

  it("User is valid / error while signup/ duplicate user", async () => {
    sinon
      .stub(UserRepository.prototype, "findByEmailId")
      .callsFake((emailId) => {
        return {
          email_id: "parveenladaf26@gmail.com",
        };
      });

    const emailId = "parveenladaf26@gmail.com";
    const expectedId = "parveenladaf26@gmail.com";
    const result = await userManager.testUser(emailId);
    assert.equal(result.email_id, expectedId);
  });

  it("User is valid / signup done/ email sent successfully.", async () => {
    const userData = {
      first_name: "parveen",
      last_name: "ladaf",
      email_id: "parveenladaf12@gmail.com",
      password: "Test@123",
    };
    const result = await userManager.register(userData);
    assert.equal(result.message, "User registered successfully");
  });

  
});
