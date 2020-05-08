module.exports = {
    LoginSchema: {
        "id": "/loginSchema",
        "type": "Object",
        "properties": {
            "first_name": {
                "type": "string",
                "description": "userName"
            },
            "last_name": {
                "type": "string",
                "description": "userName"
            },
            "password": {
                "type": "string",
                "description": "userPassword",
            },
            "email_id": {
                "type": "string",
                "pattern": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "description": "email",
            }
        },
        "required": ['email_id']
    }
};