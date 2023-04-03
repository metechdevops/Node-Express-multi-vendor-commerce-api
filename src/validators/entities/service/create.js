const {DURATION_TYPE} = require('../../../constants/constants')

const imageSchema  = {
  type: 'object',
  properties: {
    original: {
      type: ["string","null"],
      format: "uri",
      errorMessage : "Original image URL is invalid"
    },
    web: {
      type: ["string","null"],
      format: "uri",
      errorMessage : "Web image URL is invalid"
    },
    mobile: {
      type: ["string","null"],
      format: "uri",
      errorMessage : "Mobile image URL is invalid"
    }
  }
}

export const CreateSchema = {
    "type": "object",
    "required": [
      "name",
      "description",
      "category",
      "durationType",
      "price",
    ],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 120,
        errorMessage : "Service name feild is required"
      },
      description: {
        type: 'string',
        minLength: 1,
        maxLength: 500,
        errorMessage: "Description feild is required"
      },
      shortDescription: {
          type: 'string',
          maxLength: 250,
          errorMessage: "Description feild is required"
        },
      category: {
        type: 'string',
        errorMessage: "Service category feild is required"
      },
      subCategory: {
        type: 'string',
        errorMessage: "Service category feild is required"
      },
      durationType: {
        "type": "string",
        "enum": [
          DURATION_TYPE.DAY,
          DURATION_TYPE.WEEK,
          DURATION_TYPE.MONTH,
          DURATION_TYPE.ONE_TIME,
          DURATION_TYPE.HOUR,
        ],
        "errorMessage": `must be equal to one of the allowed values [
          ${DURATION_TYPE.DAY},
          ${DURATION_TYPE.WEEK},
          ${DURATION_TYPE.MONTH},
          ${DURATION_TYPE.ONE_TIME},
          ${DURATION_TYPE.HOUR},
        ]`
      },
      price: {
        type: 'integer',
        errorMessage: "Price feild is required"
      },
      mainImage: imageSchema,
      images: {
        type: 'array',
        items: imageSchema
      },
      tags: {
          type: 'array',
          items: {
              type: "string"
          }
      },
    }
}