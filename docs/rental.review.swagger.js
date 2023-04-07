export const getAllRentalReviews = {
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: ['rentalReview'],
  description: 'This route allow you to get all Rental ID reviews',
  opeationId: 'getAllRentalReviews',
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
        'Limit the number of reviews from for example 20 review to 5 reviews.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '1, name',
      description:
        'Sorting reviews according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '2',
      description:
        'When number of reviews is greater than 10 reviews, it divides into pages each page contain 10 reviews.'
    }
  ],

  responses: {
    200: {
      description: 'Get All Rental Reviews',
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
                example: 'Reviews Found Successfully.'
              },
              reviews: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '611f7236f4529300507723a2'
                    },
                    rentalId: {
                      type: 'string',
                      example: '611f6385628e64b6ff96393c'
                    },
                    user: {
                      type: 'string',
                      example: '611f62e28fa5d0a76cefbc96'
                    },
                    review: {
                      type: 'string',
                      example: 'Amazing Rental!!'
                    },
                    rating: {
                      type: 'integer',
                      example: 5
                    },
                    createdAt: {
                      type: 'string',
                      example: '2021-08-20T09:13:26.697Z'
                    },
                    updatedAt: {
                      type: 'string',
                      example: '2021-08-20T09:13:26.697Z'
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

export const getRentalReview = {
  tags: ['rentalReview'],
  description: "This route allow you to get specific review using it's ID",
  opeationId: 'getRentalReview',
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
    },
    {
      in: 'path',
      name: 'reviewId',
      type: 'integer',
      description: 'Review ID'
    }
  ],
  responses: {
    200: {
      description: 'Get Specific Reviews',
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
                example: 'Review Found Successfully.'
              },
              reviews: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '611f7236f4529300507723a2'
                    },
                    rentalId: {
                      type: 'string',
                      example: '611f6385628e64b6ff96393c'
                    },
                    user: {
                      type: 'string',
                      example: '611f62e28fa5d0a76cefbc96'
                    },
                    review: {
                      type: 'string',
                      example: 'Amazing Rental!!'
                    },
                    rating: {
                      type: 'integer',
                      example: 5
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

export const addRentalReview = {
  tags: ['rentalReview'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    'This route allow logged in user/seller/admin to make a review on a Rental ID',
  opeationId: 'addRentalReview',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            review: {
              type: 'string',
              required: true
            },
            rating: {
              type: 'integer',
              required: true
            }
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Add new review',
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
                example: 'Review Created Successfully.'
              }
            }
          }
        }
      }
    }
  }
};

export const updateRentalReview = {
  tags: ['rentalReview'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    "This route allow logged in user/seller/admin to update review using it's ID",
  opeationId: 'updateRentalReview',
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
    },
    {
      in: 'path',
      name: 'reviewId',
      type: 'integer',
      description: 'Review ID'
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            review: {
              type: 'string',
              required: true
            },
            rateing: {
              type: 'integer',
              required: true
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Update review',
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
                example: 'Review Updated Successfully.'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteRentalReview = {
  tags: ['rentalReview'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    "This route allow logged in user/seller/admin to delete review using it's ID",
  opeationId: 'deleteRentalReview',
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
    },
    {
      in: 'path',
      name: 'reviewId',
      type: 'integer',
      description: 'Review ID'
    }
  ],
  responses: {
    200: {
      description: 'Delete review',
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
                example: 'Review Deleted Successfully.'
              }
            }
          }
        }
      }
    },
    400: {
      description: 'When random user try to delete any review',
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
                example:
                  'Sorry you are not the creator of this review. You are not authorized to perform this action.'
              }
            }
          }
        }
      }
    }
  }
};
