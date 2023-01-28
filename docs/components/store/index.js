
import {ImageSchema} from "../common/index"

const StoreRequestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Lahore Store',
            maxLength:"90"
          },
          city: {
            type: 'string',
            example: 'lahore'
          },
          state: {
            type: 'string',
            example: 'lahore'
          },
          zipCode: {
            type: 'string',
            example: 'lahore'
          },
          latitude: {
            type: 'string',
            example: '35.22343223'
          },
          longitude: {
            type: 'string',
            example: '34.22343223'
          },
          country: {
            type: 'string',
            example: 'Pakistan'
          },
          address: {
            type: 'string',
            example:
              "Kareem Block Market, Karim Block Allama Iqbal Town, Lahore, Pakistan"
          },
        }
      }
    }
  }
}

const StoreResponse201 = {
  description: 'Add new store',
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
            example: 'Store Created Successfully.'
          },
          catagory: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Lahore Store'
              },
              city: {
                type: 'string',
                example: 'lahore'
              },
              state: {
                type: 'string',
                example: 'lahore'
              },
              zipCode: {
                type: 'string',
                example: 'lahore'
              },
              latitude: {
                type: 'string',
                example: '35.22343223'
              },
              longitude: {
                type: 'string',
                example: '34.22343223'
              },
              country: {
                type: 'string',
                example: 'Pakistan'
              },
              address: {
                type: 'string',
                example:
                  "Kareem Block Market, Karim Block Allama Iqbal Town, Lahore, Pakistan"
              },
            }
          }
        }
      }
    }
  }
}

const StoreResponse400 = {
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

const StoreResponse404 = {
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
            example: 'No Store Found With This ID: {id}'
          }
        }
      }
    }
  }
}

module.exports = {
  StoreRequestBody,
  StoreResponse201,
  StoreResponse400,
  StoreResponse404
}