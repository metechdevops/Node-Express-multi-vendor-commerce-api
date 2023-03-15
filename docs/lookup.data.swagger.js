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

export const completeAuthPayment = {
  tags: ['Lookup'],
  description: 'This route allow to complete powerTranz auth payment completion.',
  opeationId: 'completeAuthPayment',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            
            spiToken: {
              type: 'string',
              example: '611ed9117ae59e944d27920d'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Complete auth payment',
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
                example: 'Payment complete Successfully.'
              },
              payload: {
                type: 'object',
                properties: {
                  Approved: {
                    type: 'boolean',
                    example: true
                  },
                  AuthorizationCode: {
                    type: 'string',
                    example: '123456'
                  },
                  CardBrand: {
                    type: 'string',
                    example: 'Visa/Master'
                  },
                  CurrencyCode: {
                    type: 'number',
                    example: 780
                  },
                  IsoResponseCode: {
                    type: 'string',
                    example: "00"
                  },
                  orderIdentifier: {
                    type: 'string',
                    example: "64122691fa35373f5f017cd9"
                  },
                  PanToken: {
                    type: 'string',
                    example: '2phdinzvl78yuoac05jfl4ecys4h92f8lhxqf9loxmzs94x7rc'
                  },
                  ResponseMessage: {
                    type: 'string',
                    example: 'Transaction is approved'
                  },
                  RNN: {
                    type: 'string',
                    example: '307420589272'
                  },
                  TotalAmount: {
                    type: 'number',
                    example: 180
                  },
                  TransationIdentifier: {
                    type: 'string',
                    example: 'fb26e3d6-657b-455f-b89b-7178b204ae5f'
                  },
                  TransationType: {
                    type: 'number',
                    example: 1
                  }
                }
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
                example: 'Invalid Transaction'
              },
              payload : {
                type: 'object',
                properties: {
                  Approved: {
                    type: 'boolean',
                    example: false
                  },
                  AuthorizationCode: {
                    type: 'string',
                    example: '123456'
                  },
                  CardBrand: {
                    type: 'string',
                    example: 'Visa/Master'
                  },
                  CurrencyCode: {
                    type: 'number',
                    example: 780
                  },
                  IsoResponseCode: {
                    type: 'string',
                    example: "00"
                  },
                  orderIdentifier: {
                    type: 'string',
                    example: "64122691fa35373f5f017cd9"
                  },
                  PanToken: {
                    type: 'string',
                    example: '2phdinzvl78yuoac05jfl4ecys4h92f8lhxqf9loxmzs94x7rc'
                  },
                  ResponseMessage: {
                    type: 'string',
                    example: 'Invalid Transaction'
                  },
                  RNN: {
                    type: 'string',
                    example: '307420589272'
                  },
                  TotalAmount: {
                    type: 'number',
                    example: 180
                  },
                  TransationIdentifier: {
                    type: 'string',
                    example: 'fb26e3d6-657b-455f-b89b-7178b204ae5f'
                  },
                  TransationType: {
                    type: 'number',
                    example: 1
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