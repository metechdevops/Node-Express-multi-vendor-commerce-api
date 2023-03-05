const AddressObject = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      example: 'Jam'
    },
    lastName: {
      type: 'string',
      example: 'Ahmed'
    },
    email: {
      type: 'string',
      example: 'jam@gmail.com'
    },
    phone: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          example: '+92'
        },
        number: {
          type: 'string',
          example: '3034323454'
        },
      }
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
    isDefault: {
      type: 'boolean',
      example: false
    },
  }
}

const AddressRequestBody = {
  required: true,
  content: {
    'application/json': {
      schema: AddressObject
    }
  }
}

const AddressResponse201 = {
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
            example: 'Address Created Successfully.'
          },
          address: AddressObject
        }
      }
    }
  }
}

const AddressResponse400 = {
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

const AddressResponse404 = {
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
            example: 'No Address Found With This ID: {id}'
          }
        }
      }
    }
  }
}

module.exports = {
  AddressRequestBody,
  AddressResponse201,
  AddressResponse400,
  AddressResponse404,
  AddressObject
}