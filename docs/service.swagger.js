const {
  addServiceRequestBody,
  updateServiceBody,
  serviceObjectSchema,
  addService201,
  addService400,
} = require ('./components/service')

export const getAllServices = {
  tags: ['Service'],
  description: 'This route allow you to get all services',
  opeationId: 'getAllServices',
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
        'This will filter all services and select only services that contain the word you insert and search in all service fields about this word'
    },
    {
      in: 'query',
      name: 'isFeatured',
      type: 'boolean',
      example: 'false',
      description:
        'This will filter all featured services set by admin '
    },
    {
      in: 'query',
      name: 'category',
      type: 'string',
      example: '',
      description:
        'This will filter all services by admin specific category'
    },
    {
      in: 'query',
      name: 'seller',
      type: 'string',
      example: '',
      description:
        'This will filter all services by admin specific seller'
    },
    {
      in: 'query',
      name: 'priceRange',
      type: 'string',
      example: '0,10',
      description:
        'Filter services by price range'
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
        'Limit the number of services from for example 20 service to 5 services.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '-1, name',
      description:
        'Sorting services according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '1',
      description:
        'When number of services is greater than 10 services, it divides into pages each page contain 10 services.'
    }
  ],
  responses: {
    200: {
      description: 'Get All Services',
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
                example: 'Services Found Successfully.'
              },
              services: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: serviceObjectSchema
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
                example: 'No services found.'
              }
            }
          }
        }
      }
    }
  }
};

export const getService = {
  tags: ['Service'],
  description: "This route allow you to specific service using it's ID",
  opeationId: 'getService',
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
      description: 'Get Service',
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
                example: 'Service Found Successfully.'
              },
              service: serviceObjectSchema
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
                example: 'No service found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const addService = {
  tags: ['Service'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route allow only admin and seller to add new service',
  opeationId: 'addService',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  requestBody: addServiceRequestBody,
  responses: {
    201: addService201,
    400: addService400
  }
};

export const top5CheapServices = {
  security: {
    jwt: []
  },
  tags: ['Service'],
  description: 'This route allow you to get the top 5 cheapest services',
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
        'Limit the number of services from for example 20 service to 5 services.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '1, name',
      description:
        'Sorting services according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '2',
      description:
        'When number of services is greater than 10 services, it divides into pages each page contain 10 services.'
    }
  ],
  responses: {
    200: {
      description: 'Get Top 5 Cheapeast Services',
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
                example: 'Services Found Successfully.'
              },
              services: {
                type: 'array',
                items: serviceObjectSchema
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
                example: 'No services found.'
              }
            }
          }
        }
      }
    }
  }
};

export const serviceStats = {
  tags: ['Service'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    'This route allow only admin to get some statistics about services, ratings, categories, and price',
  opeationId: 'service-stats',
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
      description: 'Get Services Statistics',
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
                example: 'Service Statics.'
              },
              stats: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'Number Of Services': {
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

export const updateServiceDetails = {
  tags: ['Service'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    'This route allow only admin or seller to update service details',
  opeationId: 'updateServiceDetails',
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
  requestBody: updateServiceBody,
  responses: {
    200: {
      description: 'Updated service details',
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
                example: 'Service details updated successfully.'
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
                example: 'No service found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteService = {
  tags: ['Service'],
  description:
    "This route allow logged in seller/admin to delete service using it's ID",
  opeationId: 'deleteService',
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
      description: "Delete service using it's ID",
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
                example: 'Service deleted successfully.'
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
                example: 'No service found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};