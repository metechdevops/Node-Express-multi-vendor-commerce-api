export const CreateSchema = {
    "type": "object",
    "required": [
        "city",
        "state",
        "address"
    ],
    "properties": {
        city: {
          "type": "string",
          "minLength": 1,
          "maxLength": 90,
          "errorMessage": "City name feild is required"
        },
        state: {
          "type": "string",
          "minLength": 1,
          "maxLength": 90,
          "errorMessage": "State name feild is required"
        },
        address: {
          "type": "string",
          "minLength": 1,
          "maxLength": 90,
          "errorMessage": "City name feild is required"
        },
    }
}