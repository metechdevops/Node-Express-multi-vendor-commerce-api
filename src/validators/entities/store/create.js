export const CreateSchema = {
    "type": "object",
    "required": [
        "name",
    ],
    "properties": {
        name: {
            "type": "string",
            "minLength": 1,
            "maxLength": 90,
            "errorMessage": "First name feild is required"
        },
        // description: {
        //     "type": "string",
        //     "minLength": 1,
        //     "maxLength": 500,
        //     "errorMessage": "Description feild is required"
        // },
        image: {
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