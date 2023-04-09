import {ImageSchema} from "./components/common/index"

export const addFavoriteService = {
  tags: ['Service Favorite'],
  description:
    'This route allow logged in user/seller/admin to add service to his favorite list',
  opeationId: 'addFavoriteService',
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
            serviceId: {
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
      description: 'Add Service Favorite List',
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
                example: 'Service added to favorite list successfully.'
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
                example: 'Service already exits.'
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
                example: 'No service found with this ID: {id}'
              }
            }
          }
        }
      }
    }
  }
};

export const getFavoriteServicesList = {
  tags: ['Service Favorite'],
  description:
    'This route allow logged in user/seller/admin to get his favorite services list',
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
      description: "Get Service's Favorite List",
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
                  services: {
                    type: 'array',
                    items: {
                      type:'object',
                      properties:{
                        serviceId: {
                          type: 'string',
                          example: '613a6902c5fcab984501f7ee'
                        },
                        serviceInfo: {
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
                example: 'No services on the favorite list found'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteServiceFromFavorite = {
  tags: ['Service Favorite'],
  description:
    'This route allow logged in user/seller/admin to delete service from favorite list',
  opeationId: 'deleteServiceFromFavorite',
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
      name: 'serviceId',
      type: 'integer',
      description: 'Service ID'
    }
  ],
  responses: {
    200: {
      description: 'Delete Service From Favorite List',
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
                example: 'Service deleted from favorite list successfully.'
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
                example: 'Service not found in favorite list.'
              }
            }
          }
        }
      }
    }
  }
};

export const checkServiceInFavoriteList = {
  tags: ['Service Favorite'],
  description:
    'This route allow logged in user/seller/admin to check if service in favorite list',
  opeationId: 'checkServiceInFavoriteList',
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
      name: 'serviceId',
      type: 'integer',
      description: 'Service ID'
    }
  ],
  responses: {
    200: {
      description: 'Check if Service in Favorite List',
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
                example: 'Service in favorite list.'
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
                example: 'Service not found in favorite list.'
              }
            }
          }
        }
      }
    }
  }
};
