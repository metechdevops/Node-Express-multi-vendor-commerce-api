
import {ImageSchema} from "././../common/index"
import { CATEGORY_TYPE, CATEGORY_TYPE_ENUM } from "../../../src/constants/constants"

const CategoryRequestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            required: true,
            example:"New Category"
          },
          parentId: {
            type: 'string',
            required: false
          },
          contentType: {
            type: 'string',
            required: true,
            example: CATEGORY_TYPE.PRODUCT,
            enum: CATEGORY_TYPE_ENUM
          },
          isFeatured: {
            type: 'boolean',
            required: false,
            example: false,
          },
          description: {
            type: 'string',
            required: true,
            example: "This is new category"
          },
          image: ImageSchema
        }
      }
    }
  }
}

const CategoryResponse201 = {
  description: 'Add new category',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            example: 'Success'
          },
          message: {
            type: 'string',
            example: 'Category Created Successfully.'
          },
          catagory: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Laptop'
              },
              parentId: {
                type: 'string',
                example: "63cbab2be185e4cfb587c804"
              },
              contentType : {
                type: 'string',
                example: "product"
              },
              isFeatured: {
                type: 'boolean',
                example: false
              },
              description: {
                type: 'string',
                example:
                  "This category contains all products related to Laptops, it's components and accessories."
              },
              image: ImageSchema
            }
          }
        }
      }
    }
  }
}

const CategoryResponse400 = {
  description: 'Error: 400',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            example: 'Error'
          },
          message: {
            type: 'string',
            example: 'All Fields Are Required'
          }
        }
      }
    }
  }
}

const CategoryResponse404 = {
  description: 'Error: 404',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            example: 'Error'
          },
          message: {
            type: 'string',
            example: 'No Category Found With This ID: {id}'
          }
        }
      }
    }
  }
}

module.exports = {
  CategoryRequestBody,
  CategoryResponse201,
  CategoryResponse400,
  CategoryResponse404
}