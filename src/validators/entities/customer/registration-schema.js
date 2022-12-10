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
            "errorMessage": "Role feild is required"
        },
        "email": {
            "type": "string",
            "format":"email",
            "errorMessage": "Email feild is required"
        },
        "password": {
            "type": "string",
            "minLength":8,
            "errorMessage": "Password must be longer than 8 characters and contains letters, numbers, and symbols."
        }
    }
}