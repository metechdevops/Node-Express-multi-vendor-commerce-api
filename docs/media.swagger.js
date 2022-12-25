export const uploadMediaImages = {
  tags: ['Media'],
  description:
    'This route allow us to upload images with direcctory options [product, profile, collection, logo, banner, certificate] and client options will be [web and mobile]',
  opeationId: 'uploadMedia',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
  ],
  requestBody: {
    required: true,
    content: {
      'multipart/form-data:': {
        schema: {
          type: 'object',
          properties: {
            "images": {
              type: "string",
              format: "binary"
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Upload media images',
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
                example: 'Media Images uploaded to list successfully.'
              },
              media: {
                type:"object",
                properties: {
                  orignal : {
                    type:'string',
                    format:'url',
                    example:'https://e-cart-dev.s3.eu-west-1.amazonaws.com/profile/9f36572b-f478-4ee9-b22d-4d17ce695fb3.png'
                  },
                  web : {
                    type:'string',
                    format:'url',
                    example:'https://e-cart-dev.s3.eu-west-1.amazonaws.com/profile/9f36572b-f478-4ee9-b22d-4d17ce695fb3.png'
                  },
                  mobile : {
                    type:'string',
                    format:'url',
                    example:'https://e-cart-dev.s3.eu-west-1.amazonaws.com/profile/9f36572b-f478-4ee9-b22d-4d17ce695fb3.png'
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
                example: 'Not an image! Please upload only images.'
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
                example: 'Not an image! Please upload only images'
              }
            }
          }
        }
      }
    }
  }
};

