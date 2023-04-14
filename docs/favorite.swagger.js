import {ImageSchema} from "./components/common/index"

const productFavoriteSchema = {
  type: 'array',
  items: {
    type:'object',
    properties:{
      productId: {
        type: 'string',
        example: '613a6902c5fcab984501f7ee'
      },
      productInfo: {
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

const serviceFavoriteSchema = {
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
                example:"Test"
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

const rentalFavoriteSchema = {
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
                example:"Test "
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

export const addFavoriteProduct = {
  tags: ['Favorite'],
  description:
    'This route allow logged in user/seller/admin to add product to his favorite list',
  opeationId: 'addFavoriteProduct',
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
            productId: {
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
      description: 'Add Product Favorite List',
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
                example: 'Product added to favorite list successfully.'
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
                example: 'Product already exits.'
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
                example: 'No product found with this ID: {id}'
              }
            }
          }
        }
      }
    }
  }
};

export const getFavoriteList = {
  tags: ['Favorite'],
  description:
    'This route allow logged in user/seller/admin to get his favorite products list',
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
      description: "Get Product's Favorite List",
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
              products: {
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
                  products: productFavoriteSchema
                }
              },
              services: {
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
                  services: serviceFavoriteSchema
                }
              },
              rentals: {
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
                  rentals: rentalFavoriteSchema
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
                example: 'No products on the favorite list found'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteProductFromFavorite = {
  tags: ['Favorite'],
  description:
    'This route allow logged in user/seller/admin to delete product from favorite list',
  opeationId: 'deleteProductFromFavorite',
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
      name: 'productId',
      type: 'integer',
      description: 'Product ID'
    }
  ],
  responses: {
    200: {
      description: 'Delete Product From Favorite List',
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
                example: 'Product deleted from favorite list successfully.'
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
                example: 'Product not found in favorite list.'
              }
            }
          }
        }
      }
    }
  }
};

export const checkProductInFavoriteList = {
  tags: ['Favorite'],
  description:
    'This route allow logged in user/seller/admin to check if product in favorite list',
  opeationId: 'checkProductInFavoriteList',
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
      name: 'productId',
      type: 'integer',
      description: 'Product ID'
    }
  ],
  responses: {
    200: {
      description: 'Check if Product in Favorite List',
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
                example: 'Product in favorite list.'
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
                example: 'Product not found in favorite list.'
              }
            }
          }
        }
      }
    }
  }
};
