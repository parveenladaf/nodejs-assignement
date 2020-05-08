const app = require("express")();
const dotenv = require("dotenv");


const users = require("./src/controller/handler.controller");
app.use(require("body-parser").json());

dotenv.config();

app.get("/login", users.auth.login);

port = process.env.PORT_NO || 8000;
app.listen(port);
console.log("Server listening at port:" + port);

