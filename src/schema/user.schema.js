module.exports = {
  id: "/userSchema",
  type: "Object",
  properties: {
    first_name: {
      type: "string",
      description: "userName",
    },
    last_name: {
      type: "string",
      description: "userName",
    },
    password: {
      type: "string",
      description: "userPassword",
    },
    email_id: {
      type: "string",
      format: "email",
      description: "email",
    },
  },
  required: ["email_id"],
};
