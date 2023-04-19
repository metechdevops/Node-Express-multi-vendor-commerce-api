const {
  addRentalBookingRequestBody,
  getSingleBookingSchema,
  addRentalBooking201,
} = require ('./components/rental-booking')


export const getAllRentalBookings = {
  tags: ['Rental Booking'],
  description: 'This route allow logged in user/seller/admin get his rental booking',
  opeationId: 'getAllOrders',
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
      in: 'query',
      name: 'filter',
      type: 'string',
      example: '',
      description:
        'This will filter all rental booking and select only booking that contain the word you insert and search in all user fields about this word'
    },
    {
      in: 'query',
      name: 'select',
      type: 'string',
      example: 'totalPrice',
      description: 'Select only fields you want.'
    },
    {
      in: 'query',
      name: 'user',
      type: 'string',
      example: '',
      description: 'Filters booking by seller id.'
    },
    {
      in: 'query',
      name: 'status',
      type: 'string',
      example: '',
      description: 'Filters booking by status.'
    },
    {
      in: 'query',
      name: 'limit',
      type: 'string',
      example: '5',
      description:
        'Limit the number of rental booking from for example 20 booking to 5 bookings.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '-1, totalPrice',
      description:
        'Sorting rental booking according to specified field for example the name field, and the number before the field name indicates the booking of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '1',
      description:
        'When number of rental booking is greater than 10 rental booking, it divides into pages each page contain 10 rental booking.'
    }
  ],
  responses: {
    201: {
      description: 'Get all rental booking',
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
                example: 'Orders Found Successfully.'
              },
              bookings: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: getSingleBookingSchema
                }
              }
            }
          }
        }
      }
    }
  }
};

export const getRentalBooking = {
  tags: ['Rental Booking'],
  description:
    "This route allow logged in user/seller/admin get specific booking using it's ID",
  opeationId: 'getRentalBooking',
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
      name: 'id',
      type: 'integer',
      description: 'RentalBooking ID'
    }
  ],
  responses: {
    200: {
      description: "Get specific booking using it's ID",
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
                example: 'RentalBooking found successfully.'
              },
              booking: {
                type: 'object',
                properties: getSingleBookingSchema
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
                example: 'No rental booking found.'
              }
            }
          }
        }
      }
    }
  }
};

export const createNewRentalBooking = {
  tags: ['Rental Booking'],
  description: 'This route allow logged in user/seller/admin create new rental booking',
  opeationId: 'createNewRentalBooking',
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
    }
  ],
  requestBody: addRentalBookingRequestBody,
  responses: {
    201: addRentalBooking201
  }
};

export const rentalBookingStatus = {
  tags: ['Rental Booking'],
  description: 'This route allow logged in seller update booking status',
  opeationId: 'rentalBookingStatus',
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
      name: 'id',
      type: 'integer',
      description: 'RentalBooking ID'
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              required: true,
              example:
                'pending | accepted | rejected | completed'
            }
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Update booking status',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'Success'
              },
              message1: {
                type: 'string',
                example: 'Service booking status updated successfully.'
              },
              message2: {
                type: 'string',
                example: 'Service booking Deleteded successfully.'
              }
            }
          }
        }
      }
    },
    400: {
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
              message1: {
                type: 'string',
                example: 'All fields are required.'
              },
              message2: {
                type: 'string',
                example:
                  'Sorry by status must be one of the following: Not pending, accepted, rejected, completed'
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
              message1: {
                type: 'string',
                example: 'No booking found'
              },
              message2: {
                type: 'string',
                example: 'No rental booking found with this ID'
              }
            }
          }
        }
      }
    }
  }
};

export const cancelRentalBooking = {
  tags: ['Rental Booking'],
  description:
    "This route allow logged in user/seller/admin delete specific booking using it's ID",
  opeationId: 'cancelRentalBooking',
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
      name: 'id',
      type: 'integer',
      description: 'RentalBooking ID'
    }
  ],
  responses: {
    200: {
      description: "Deleted specific booking using it's ID",
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
                example: 'RentalBooking Deleteded successfully.'
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
              message1: {
                type: 'string',
                example: 'No rental booking found.'
              },
              message2: {
                type: 'string',
                example: 'No rental booking found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};
