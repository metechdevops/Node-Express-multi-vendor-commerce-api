const {
  AddressRequestBody,
  AddressResponse201,
  AddressResponse400,
  AddressResponse404,
  AddressObject
} = require ('./components/address')

export const getAllAddress = {
  tags: ['Address'],
  description: 'This route allow to get all address',
  opeationId: 'getAllAddress',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'query',
      name: 'select',
      type: 'string',
      example: 'city, state, zipCode, address, latitude, longitude',
      description: 'Select only fields you want.'
    },
    {
      in: 'query',
      name: 'limit',
      type: 'string',
      example: '5',
      description:
        'Limit the number of address from for example 20 address to 5 address.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '1, name',
      description:
        'Sorting address according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '2',
      description:
        'When number of address is greater than 10 address, it divides into pages each page contain 10 address.'
    }
  ],
  responses: {
    200: {
      description: 'Get All Address',
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
                example: 'Found address Successfully.'
              },
              address: {
                type: 'array',
                items: AddressObject
              }
            }
          }
        }
      }
    },
    404: {
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
                example: 'No Addresses Found'
              }
            }
          }
        }
      }
    }
  }
};

export const getAddress = {
  tags: ['Address'],
  description: "This route allow to get address using it's ID",
  opeationId: 'getAddress',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'addressId',
      type: 'integer',
      description: 'Address ID'
    }
  ],
  responses: {
    200: {
      description: "Get address using it's ID",
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
                example: 'Address Found Successfully.'
              },
              address: {
                type: 'array',
                items: AddressObject
              }
            }
          }
        }
      }
    },
    404: {
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
  }
};

export const addAddress = {
  tags: ['Address'],
  description: 'This route allow only admin to add new address',
  opeationId: 'addAddress',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: AddressRequestBody,
  responses: {
    201: AddressResponse201,
    400: AddressResponse400
  }
};

export const updateAddressDetails = {
  tags: ['Address'],
  description:
    'This route allow only admin to update address details [name/description]',
  opeationId: 'updateAddressDetails',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'addressId',
      type: 'integer',
      description: 'Address ID'
    }
  ],
  requestBody: AddressRequestBody,
  responses: {
    200: AddressResponse201,
    404: AddressResponse404
  }
};


export const deleteAddress = {
  tags: ['Address'],
  description: 'This route allow only admin to delete the address',
  opeationId: 'deleteAddress',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'addressId',
      type: 'integer',
      description: 'Address ID'
    }
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Delete address',
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
                example: 'Address Deleted Successfully.'
              }
            }
          }
        }
      }
    },
    404: {
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
  }
};
