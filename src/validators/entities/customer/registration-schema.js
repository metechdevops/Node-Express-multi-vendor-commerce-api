const {USER_ROLE} = require('../../../constants/constants')

export const registrationSchema = {
    "type": "object",
    "required": [
        "firstName",
        "lastName",
        "email",
        "password",
        "role"
    ],
    "properties": {
        "firstName": {
            "type": "string",
            "minLength": 1,
            "errorMessage": "First name feild is required"
        },
        "lastName": {
            "type": "string",
            "minLength": 1,
            "errorMessage": "Last name feild is required"
        },
        "role": {
            "type": "string",
            "enum": [USER_ROLE.USER],
            "errorMessage": `must be equal to one of the allowed values [${USER_ROLE.USER}]`
        },
        "email": {
            "type": "string",
            "format":"email",
            "errorMessage": "Email feild is required"
        },
        "password": {
            "type": "string",
            "maxLength":8,
            "minLength":3,
            "errorMessage": "Password must be longer than 8 characters and contains letters, numbers, and symbols."
        }
    }
}