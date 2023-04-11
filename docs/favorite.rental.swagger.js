import {ImageSchema} from "./components/common/index"

export const addFavoriteRental = {
  tags: ['Rental Favorite'],
  description:
    'This route allow logged in user/seller/admin to add rental to his favorite list',
  opeationId: 'addFavoriteRental',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            rentalId: {
              type: 'string',
              required: true
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Add Rental Favorite List',
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
                example: 'Rental added to favorite list successfully.'
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
              message: {
                type: 'string',
                example: 'Rental already exits.'
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
                example: 'No rental found with this ID: {id}'
              }
            }
          }
        }
      }
    }
  }
};

export const getFavoriteRentalsList = {
  tags: ['Rental Favorite'],
  description:
    'This route allow logged in user/seller/admin to get his favorite rentals list',
  opeationId: 'getFavoriteList',
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
  responses: {
    200: {
      description: "Get Rental's Favorite List",
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
                example: 'Favorite list successfully retrieved.'
              },
              favorite: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '613a6902c5fcab984501f7ee'
                  },
                  user: {
                    type: 'string',
                    example: '611d0cf2ab79f9bb0c388234'
                  },
                  rentals: {
                    type: 'array',
                    items: {
                      type:'object',
                      properties:{
                        rentalId: {
                          type: 'string',
                          example: '613a6902c5fcab984501f7ee'
                        },
                        rentalInfo: {
                          type: 'object',
                          properties: {
                            seller: {
                              type: 'object',
                              properties : {
                                id : {
                                  type: 'string',
                                  example:"611d08a62fc210a30ecfb75b"
                                },
                                name : {
                                  type: 'string',
                                  example:"Test Category"
                                }
                              }
                            },
                            mainImage: ImageSchema,
                            name: {
                              type: 'string',
                              example: 'MacBook Air (13-inch, Early 2015) 4gb 128gb'
                            },
                            slug: {
                              type: 'string',
                              example: 'macbook-air-(13-inch-early-2015)-4gb-128gb'
                            }
                          }
                        },
                      }
                    }
                  }
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
                example: 'No rentals on the favorite list found'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteRentalFromFavorite = {
  tags: ['Rental Favorite'],
  description:
    'This route allow logged in user/seller/admin to delete rental from favorite list',
  opeationId: 'deleteRentalFromFavorite',
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
      description: 'Delete Rental From Favorite List',
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
                example: 'Rental deleted from favorite list successfully.'
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
                example: 'Rental not found in favorite list.'
              }
            }
          }
        }
      }
    }
  }
};

export const checkRentalInFavoriteList = {
  tags: ['Rental Favorite'],
  description:
    'This route allow logged in user/seller/admin to check if rental in favorite list',
  opeationId: 'checkRentalInFavoriteList',
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
      description: 'Check if Rental in Favorite List',
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
                example: 'Rental in favorite list.'
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
                example: 'Rental not found in favorite list.'
              }
            }
          }
        }
      }
    }
  }
};
