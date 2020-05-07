const app = require('express')();


const users = require('./src/controller/user.controller');


app.get('/', users.default);

port = process.env.PORT_NO|| 8000;
app.listen(port);
    console.log('Server listening at port:'+ port);
