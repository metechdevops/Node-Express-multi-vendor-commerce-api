import { ImageSchema } from './components/common';

const {
  addProductRequestBody,
  productObjectSchema,
  addProduct201,
  addProduct400,
  addProduct404
} = require ('./components/product')

export const getAllProducts = {
  security: {
    jwt: []
  },
  tags: ['Product'],
  description: 'This route allow you to get all products',
  opeationId: 'getAllProducts',
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
      example: 'flawless',
      description:
        'This will filter all products and select only products that contain the word you insert and search in all product fields about this word'
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
        'Limit the number of products from for example 20 product to 5 products.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '-1, name',
      description:
        'Sorting products according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '2',
      description:
        'When number of products is greater than 10 products, it divides into pages each page contain 10 products.'
    }
  ],
  responses: {
    200: {
      description: 'Get All Products',
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
                example: 'Products Found Successfully.'
              },
              products: {
                type: 'array',
                items: productObjectSchema
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
                example: 'No products found.'
              }
            }
          }
        }
      }
    }
  }
};

export const getProduct = {
  security: {
    jwt: []
  },
  tags: ['Product'],
  description: "This route allow you to specific product using it's ID",
  opeationId: 'getProduct',
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
      description: 'Get Product',
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
                example: 'Product Found Successfully.'
              },
              product: productObjectSchema
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
                example: 'No product found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const addProduct = {
  tags: ['Product'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route allow only admin and seller to add new product',
  opeationId: 'addProduct',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  requestBody: addProductRequestBody,
  responses: {
    201: addProduct201,
    400: addProduct400
  }
};

export const top5Cheap = {
  security: {
    jwt: []
  },
  tags: ['Product'],
  description: 'This route allow you to get the top 5 cheapest products',
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
        'Limit the number of products from for example 20 product to 5 products.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '1, name',
      description:
        'Sorting products according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '2',
      description:
        'When number of products is greater than 10 products, it divides into pages each page contain 10 products.'
    }
  ],
  responses: {
    200: {
      description: 'Get Top 5 Cheapeast Products',
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
                example: 'Products Found Successfully.'
              },
              products: {
                type: 'array',
                items: productObjectSchema
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
                example: 'No products found.'
              }
            }
          }
        }
      }
    }
  }
};

export const productStats = {
  tags: ['Product'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    'This route allow only admin to get some statistics about products, ratings, categories, and price',
  opeationId: 'product-stats',
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
      description: 'Get Products Statistics',
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
                example: 'Product Statics.'
              },
              stats: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'Number Of Products': {
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

export const addProductColor = {
  tags: ['Product'],
  description: 'This route allow only admin or seller add new product color',
  opeationId: 'addProductColor',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            color: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Add Product Color',
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
                example: 'Color added successfully.'
              },
              color: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '6145e6f059b4c663fa7e0da2'
                  },
                  color: {
                    type: 'string',
                    example: 'Red'
                  },
                  product: {
                    type: 'array',
                    items: {
                      type: 'string',
                      example: '6145a457d495858ff0d6e89f'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    401: {
      description: 'Error: 401',
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
                example: 'Color already exists.'
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
                example: 'No product found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const addProductSize = {
  tags: ['Product'],
  description: 'This route allow only admin or seller add new product size',
  opeationId: 'addProductSize',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            size: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Add Product Size',
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
                example: 'Size added successfully.'
              },
              color: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '6145e6f059b4c663fa7e0da2'
                  },
                  size: {
                    type: 'string',
                    example: 'Large'
                  },
                  product: {
                    type: 'array',
                    items: {
                      type: 'string',
                      example: '6145a457d495858ff0d6e89f'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    401: {
      description: 'Error: 401',
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
                example: 'Size already exists.'
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
                example: 'No product found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const updateProductDetails = {
  tags: ['Product'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    'This route allow only admin or seller to update product details',
  opeationId: 'updateProductDetails',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            category: {
              type: 'string'
            },
            price: {
              type: 'integer'
            },
            priceDiscount: {
              type: 'integer'
            },
            quantity: {
              type: 'integer'
            },
            sold: {
              type: 'integer'
            },
            isOutOfStock: {
              type: 'boolean'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Updated product details',
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
                example: 'Product details updated successfully.'
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
                example: 'No product found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const updateProductMainImage = {
  tags: ['Product'],
  description:
    'This route allow only seller or admin to update product main image [ mainImage ]',
  opeationId: 'updateProductMainImage',
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
  requestBody: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            mainImage: {
              type: 'string',
              format: 'image'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Updated product main image',
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
                example: 'Product main image updated successfully.'
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
                example: 'No product found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const updateProductImages = {
  tags: ['Product'],
  description:
    'This route allow only seller or admin to update product images [ images ]',
  opeationId: 'updateProductImages',
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
  requestBody: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            images: {
              type: 'string',
              format: 'image'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Updated product images',
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
                example: 'Product images updated successfully.'
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
                example: 'Please select one or more image.'
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
                example: 'No product found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteProduct = {
  tags: ['Product'],
  description:
    "This route allow logged in seller/admin to delete product using it's ID",
  opeationId: 'deleteProduct',
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
      description: "Delete product using it's ID",
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
                example: 'Product deleted successfully.'
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
                example: 'No product found with this ID.'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteProductColor = {
  tags: ['Product'],
  description:
    "This route allow logged in seller/admin to delete product color using it's ID",
  opeationId: 'deleteProductColor',
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
      description: 'Delete Product Color',
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
                example: 'Product color deleted successfully.'
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
                example: 'No product found with this ID.'
              },
              message2: {
                type: 'string',
                example: 'Color does not exist.'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteProductSize = {
  tags: ['Product'],
  description:
    "This route allow logged in seller/admin to delete product size using it's ID",
  opeationId: 'deleteProductSize',
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
      description: 'Delete product size',
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
                example: 'Size deleted successfully.'
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
                example: 'No product found with this ID.'
              },
              message2: {
                type: 'string',
                example: 'Size does not exist.'
              }
            }
          }
        }
      }
    }
  }
};
