const app = require("express")();
const dotenv = require("dotenv");
var cors = require('cors')

app.use(require("body-parser").json());

// Loads .env configration from local.
dotenv.config();

app.use(cors())

const { userController } = require("./src/controller");
app.post("/register", userController.register);

port = process.env.PORT_NO || 8000;

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
