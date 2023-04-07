const {
  addRentalRequestBody,
  updateRentalBody,
  rentalObjectSchema,
  addRental201,
  addRental400,
} = require ('./components/rental')

export const getAllRentals = {
  tags: ['Rental'],
  description: 'This route allow you to get all rentals',
  opeationId: 'getAllRentals',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'query',
      name: 'filter',
      type: 'string',
      example: '',
      description:
        'This will filter all rentals and select only rentals that contain the word you insert and search in all rental fields about this word'
    },
    {
      in: 'query',
      name: 'isFeatured',
      type: 'boolean',
      example: 'false',
      description:
        'This will filter all featured rentals set by admin '
    },
    {
      in: 'query',
      name: 'category',
      type: 'string',
      example: '',
      description:
        'This will filter all rentals by admin specific category'
    },
    {
      in: 'query',
      name: 'seller',
      type: 'string',
      example: '',
      description:
        'This will filter all rentals by admin specific seller'
    },
    {
      in: 'query',
      name: 'priceRange',
      type: 'string',
      example: '0,10',
      description:
        'Filter rentals by price range'
    },
    {
      in: 'query',
      name: 'select',
      type: 'string',
      example: '',
      description: 'Select only fields you want.'
    },
    {
      in: 'query',
      name: 'limit',
      type: 'string',
      example: '5',
      description:
        'Limit the number of rentals from for example 20 rental to 5 rentals.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '-1, name',
      description:
        'Sorting rentals according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '1',
      description:
        'When number of rentals is greater than 10 rentals, it divides into pages each page contain 10 rentals.'
    }
  ],
  responses: {
    200: {
      description: 'Get All Rentals',
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
                example: 'Rentals Found Successfully.'
              },
              rentals: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: rentalObjectSchema
                  },
                  currentPage:{
                    type: 'number',
                    example: 1
                  },
                  totalPage:{
                    type: 'number',
                    example: 10
                  },
                  totalDocs:{
                    type: 'number',
                    example: 100
                  },
                }

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
                example: 'No rentals found.'
              }
            }
          }
        }
      }
    }
  }
};

export const getRental = {
  tags: ['Rental'],
  description: "This route allow you to specific rental using it's ID",
  opeationId: 'getRental',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'rentalId',
      type: 'integer',
      description: 'Rental ID'
    }
  ],
  responses: {
    200: {
      description: 'Get Rental',
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
                example: 'Rental Found Successfully.'
              },
              rental: rentalObjectSchema
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
                example: 'No rental found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const addRental = {
  tags: ['Rental'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route allow only admin and seller to add new rental',
  opeationId: 'addRental',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  requestBody: addRentalRequestBody,
  responses: {
    201: addRental201,
    400: addRental400
  }
};

export const top5CheapRentals = {
  security: {
    jwt: []
  },
  tags: ['Rental'],
  description: 'This route allow you to get the top 5 cheapest rentals',
  opeationId: 'top5Cheap',
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
      example: 'name, image',
      description: 'Select only fields you want.'
    },
    {
      in: 'query',
      name: 'limit',
      type: 'string',
      example: '5',
      description:
        'Limit the number of rentals from for example 20 rental to 5 rentals.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '1, name',
      description:
        'Sorting rentals according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '2',
      description:
        'When number of rentals is greater than 10 rentals, it divides into pages each page contain 10 rentals.'
    }
  ],
  responses: {
    200: {
      description: 'Get Top 5 Cheapeast Rentals',
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
                example: 'Rentals Found Successfully.'
              },
              rentals: {
                type: 'array',
                items: rentalObjectSchema
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
                example: 'No rentals found.'
              }
            }
          }
        }
      }
    }
  }
};

export const rentalStats = {
  tags: ['Rental'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    'This route allow only admin to get some statistics about rentals, ratings, categories, and price',
  opeationId: 'rental-stats',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  responses: {
    200: {
      description: 'Get Rentals Statistics',
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
                example: 'Rental Statics.'
              },
              stats: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'Number Of Rentals': {
                      type: 'integer',
                      example: 1
                    },
                    'Number Of Ratings': {
                      type: 'integer',
                      example: 0
                    },
                    'Average Rating': {
                      type: 'integer',
                      example: 4.5
                    },
                    'Average Price': {
                      type: 'integer',
                      example: 3100
                    },
                    'Minimum Price': {
                      type: 'integer',
                      example: 3100
                    },
                    'Maximum Price': {
                      type: 'integer',
                      example: 31
                    },
                    Quantity: {
                      type: 'integer',
                      example: 49
                    },
                    category: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                          example: 'Laptop'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const updateRentalDetails = {
  tags: ['Rental'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    'This route allow only admin or seller to update rental details',
  opeationId: 'updateRentalDetails',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'rentalId',
      type: 'integer',
      description: 'Rental ID'
    }
  ],
  requestBody: updateRentalBody,
  responses: {
    200: {
      description: 'Updated rental details',
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
                example: 'Rental details updated successfully.'
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
                example: 'No rental found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteRental = {
  tags: ['Rental'],
  description:
    "This route allow logged in seller/admin to delete rental using it's ID",
  opeationId: 'deleteRental',
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
      name: 'rentalId',
      type: 'integer',
      description: 'Rental ID'
    }
  ],
  responses: {
    200: {
      description: "Delete rental using it's ID",
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
                example: 'Rental deleted successfully.'
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
                example: 'No rental found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};