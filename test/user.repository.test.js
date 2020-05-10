const sinon = require("sinon");
const ConnectionProvider = require("../src/connection.provider");
const mockMysql = sinon.mock(require("mysql"));
const assert = require("assert");

describe("COnnection provider test", function () {
  sinon.stub(ConnectionProvider, "getConnection").returns("connected");

  it("get connection", () => {
    const result = ConnectionProvider.getConnection();
    console.log(result);
    assert.equal(result, "connected");
  });5
});
