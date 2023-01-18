import { ImageSchema } from './components/common';

const {
  StoreRequestBody,
  StoreResponse201,
  StoreResponse400,
  StoreResponse404
} = require ('./components/store')

export const getAllStores = {
  tags: ['Store'],
  description: 'This route allow to get all store',
  opeationId: 'getAllCategories',
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
      example: 'name, city, state, zipCode, address, latitude, longitude',
      description: 'Select only fields you want.'
    },
    {
      in: 'query',
      name: 'seller',
      type: 'string',
      example: '63962b8329332701293541ff',
      description: 'Filter stores by marchent account.'
    },
    {
      in: 'query',
      name: 'limit',
      type: 'string',
      example: '5',
      description:
        'Limit the number of stores from for example 20 store to 5 stores.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '1, name',
      description:
        'Sorting stores according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '2',
      description:
        'When number of stores is greater than 10 stores, it divides into pages each page contain 10 stores.'
    }
  ],
  responses: {
    200: {
      description: 'Get All Categories',
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
                example: 'Found stores Successfully.'
              },
              catagories: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '611ed9117ae59e944d27920d'
                    },
                    name: {
                      type: 'string',
                      example: 'Makeup'
                    },
                    description: {
                      type: 'string',
                      example:
                        'This store contains all products related to makeup.'
                    },
                    image: ImageSchema,
                    createdAt: {
                      type: 'string',
                      example: '2021-08-19T22:20:01.688Z'
                    },
                    updatedAt: {
                      type: 'string',
                      example: '2021-08-19T22:20:01.688Z'
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
                example: 'No Categories Found'
              }
            }
          }
        }
      }
    }
  }
};

export const getStore = {
  tags: ['Store'],
  description: "This route allow to get store using it's ID",
  opeationId: 'getStore',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'storeId',
      type: 'integer',
      description: 'Store ID'
    }
  ],
  responses: {
    200: {
      description: "Get store using it's ID",
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
                example: 'Store Found Successfully.'
              },
              catagory: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '611ed9117ae59e944d27920d'
                    },
                    name: {
                      type: 'string',
                      example: 'Makeup'
                    },
                    description: {
                      type: 'string',
                      example:
                        'This store contains all products related to makeup.'
                    },
                    image: ImageSchema,
                    createdAt: {
                      type: 'string',
                      example: '2021-08-19T22:20:01.688Z'
                    },
                    updatedAt: {
                      type: 'string',
                      example: '2021-08-19T22:20:01.688Z'
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
                example: 'No Store Found With This ID: {id}'
              }
            }
          }
        }
      }
    }
  }
};

export const addStore = {
  tags: ['Store'],
  description: 'This route allow only admin to add new store',
  opeationId: 'addStore',
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
  requestBody: StoreRequestBody,
  responses: {
    201: StoreResponse201,
    400: StoreResponse400
  }
};

export const updateStoreDetails = {
  tags: ['Store'],
  description:
    'This route allow only admin to update store details [name/description]',
  opeationId: 'updateStoreDetails',
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
      name: 'storeId',
      type: 'integer',
      description: 'Store ID'
    }
  ],
  requestBody: StoreRequestBody,
  responses: {
    200: StoreResponse201,
    404: StoreResponse404
  }
};


export const deleteStore = {
  tags: ['Store'],
  description: 'This route allow only admin to delete the store',
  opeationId: 'deleteStore',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'path',
      name: 'storeId',
      type: 'integer',
      description: 'Store ID'
    }
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Delete store',
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
                example: 'Store Deleted Successfully.'
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
                example: 'No Store Found With This ID: {id}'
              }
            }
          }
        }
      }
    }
  }
};
