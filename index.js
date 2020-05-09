const app = require("express")();
const dotenv = require("dotenv");

app.use(require("body-parser").json());

// Loads .env configration from local.
dotenv.config();

const { userController } = require("./src/controller");
app.get("/register", userController.register);

port = process.env.PORT_NO || 8000;

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
