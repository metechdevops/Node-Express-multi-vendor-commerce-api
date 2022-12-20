export const customerProfileSchema = {
    "type": "object",
    "required": [
        "firstName",
        "lastName",
    ],
    "properties": {
        firstName: {
            "type": "string",
            "minLength": 1,
            "errorMessage": "First name feild is required"
        },
        lastName: {
            "type": "string",
            "minLength": 1,
            "errorMessage": "Last name feild is required"
        },
        profileImage: {
            type: 'object',
            nullable: true,
            properties: {
              original: {
                type: ["string","null"],
                format: "uri",
                nullable: true,
                errorMessage : "Original image URL is invalid"
              },
              web: {
                type: ["string","null"],
                format: "uri",
                nullable: true,
                errorMessage : "Web image URL is invalid"
              },
              mobile: {
                type: ["string","null"],
                format: "uri",
                nullable: true,
                errorMessage : "Mobile image URL is invalid"
              }
            }
          }
    }
}