import { ImageSchema } from './components/common';

export const getAllLookupData = {
  tags: ['Lookup'],
  description: 'This route allow to get all store',
  opeationId: 'getAllCategories',
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
      description: 'Get All Lookup Data',
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
                example: 'Found lookup data Successfully.'
              },
              unitType: {
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
                      example: 'clothes'
                    },
                    description: {
                      type: 'string',
                      example:
                        'This is women clothes'
                    }
                  }
                }
              },
              categories: {
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
                        'This category contains all products related to makeup.'
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
                example: 'No Lookup Data Found'
              }
            }
          }
        }
      }
    }
  }
};

