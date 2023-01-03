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
        "unitType",
        "unitValue",
        "price",
        "quantity",
        "stores",
        "sold",
        "isOutOfStock",
        "colors",
        "sizes"
    ],
    properties: {
      name: {
        type: 'string',
        errorMessage : "Product name feild is required"
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
        errorMessage: "Product category feild is required"
      },
      unitType: {
          type: 'string',
          errorMessage: "Product unit type feild is required"
      },
      unitValue: {
          type: 'string',
          errorMessage: "Product unit value feild is required"
      },
      price: {
        type: 'integer',
        errorMessage: "Price feild is required"
      },
      priceDiscount: {
        type: 'integer',
      },
      colors: {
        type: 'string',
        errorMessage: "Product color options are required"
      },
      sizes: {
        type: 'string',
        errorMessage: "Product size options are required"
      },
      quantity: {
        type: 'integer',
        errorMessage: "Product quantity field is required"
      },
      sold: {
        type: 'integer',
        errorMessage: "Product sold out field is required"
      },
      isOutOfStock: {
        type: 'boolean',
        enum:[true,false],
        errorMessage: "Product out of stock field is required"
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
      stores: {
          type: 'array',
          items: {
              type: "string"
          }
      }
    }
}