import {ImageSchema} from "./components/common/index"

export const getCart = {
  tags: ['Cart'],
  description: 'This route allow logged in user/seller/admin to get his cart',
  opeationId: 'getCart',
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
      description: 'Get your cart items',
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
                example: 'Cart Found Successfully.'
              },
              cart: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'mle.mahmoud.yasser@gmail.com'
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '61221141f34a829cdf7ca542'
                        },
                        product: {
                          type: 'string',
                          example: '611f6385628e64b6ff96393c'
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
                            },
                            price: {
                              type: 'string',
                              example: '200'
                            }
                          }
                        },
                        selectedColor: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6146e63c1d67816c6f9d63c7'
                            },
                            color: {
                              type: 'string',
                              example: 'Red'
                            }
                          }
                        },
                        selectedSize: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6145a458d495858ff0d6e8a5'
                            },
                            color: {
                              type: 'string',
                              example: 'L'
                            }
                          }
                        },
                        totalProductQuantity: {
                          type: 'integer',
                          example: 2
                        },
                        totalProductPrice: {
                          type: 'integer',
                          example: 6200
                        }
                      }
                    }
                  },
                  totalQuantity: {
                    type: 'integer',
                    example: 2
                  },
                  totalPrice: {
                    type: 'integer',
                    example: 6200
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
                example: 'No cart found for the user with this email.'
              }
            }
          }
        }
      }
    }
  }
};

export const addItemsToCart = {
  tags: ['Cart'],
  description:
    'This route allow logged in user/seller/admin to add items to his cart',
  opeationId: 'addItemsToCart',
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
            },
            quantity: {
              type: 'integer',
              required: true
            },
            selectedColor: {
              type: 'string',
              required: false
            },
            selectedSize: {
              type: 'string',
              required: false
            }
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Add items to your cart',
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
                example: 'Item Added To Cart Successfully.'
              },
              cart: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'mle.mahmoud.yasser@gmail.com'
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '61221141f34a829cdf7ca542'
                        },
                        product: {
                          type: 'string',
                          example: '611f6385628e64b6ff96393c'
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
                            },
                            price: {
                              type: 'string',
                              example: '200'
                            }
                          }
                        },
                        selectedColor: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6146e63c1d67816c6f9d63c7'
                            },
                            color: {
                              type: 'string',
                              example: 'Red'
                            }
                          }
                        },
                        selectedSize: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6145a458d495858ff0d6e8a5'
                            },
                            color: {
                              type: 'string',
                              example: 'L'
                            }
                          }
                        },
                        totalProductQuantity: {
                          type: 'integer',
                          example: 2
                        },
                        totalProductPrice: {
                          type: 'integer',
                          example: 6200
                        }
                      }
                    }
                  },
                  totalQuantity: {
                    type: 'integer',
                    example: 2
                  },
                  totalPrice: {
                    type: 'integer',
                    example: 6200
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
                example: 'Invalid request.'
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

export const increaseProductQuantityByOne = {
  tags: ['Cart'],
  description:
    'This route allow logged in user/seller/admin to increase product quantity by one',
  opeationId: 'increaseProductQuantityByOne',
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
            },
            // selectedColor: {
            //   type: 'string',
            //   required: true
            // },
            // selectedSize: {
            //   type: 'string',
            //   required: true
            // }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Increase product quantity by one',
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
                example: 'Item Increased By One In Cart Successfully.'
              },
              cart: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'mle.mahmoud.yasser@gmail.com'
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '61221141f34a829cdf7ca542'
                        },
                        product: {
                          type: 'string',
                          example: '611f6385628e64b6ff96393c'
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
                            },
                            price: {
                              type: 'string',
                              example: '200'
                            }
                          }
                        },
                        selectedColor: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6146e63c1d67816c6f9d63c7'
                            },
                            color: {
                              type: 'string',
                              example: 'Red'
                            }
                          }
                        },
                        selectedSize: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6145a458d495858ff0d6e8a5'
                            },
                            color: {
                              type: 'string',
                              example: 'L'
                            }
                          }
                        },
                        totalProductQuantity: {
                          type: 'integer',
                          example: 3
                        },
                        totalProductPrice: {
                          type: 'integer',
                          example: 9300
                        }
                      }
                    }
                  },
                  totalQuantity: {
                    type: 'integer',
                    example: 3
                  },
                  totalPrice: {
                    type: 'integer',
                    example: 9300
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
              message1: {
                type: 'string',
                example: 'No product found with this ID.'
              },
              message2: {
                type: 'string',
                example: 'No cart found for user with this email.'
              },
              message3: {
                type: 'string',
                example: 'No product found with this ID in the cart.'
              }
            }
          }
        }
      }
    }
  }
};

export const reduceProductQuantityByOne = {
  tags: ['Cart'],
  description:
    'This route allow logged in user/seller/admin to reduce product quantity by one',
  opeationId: 'reduceProductQuantityByOne',
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
            },
            // selectedColor: {
            //   type: 'string',
            //   required: true
            // },
            // selectedSize: {
            //   type: 'string',
            //   required: true
            // }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Reduce product quantity by one',
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
                example: 'Item reduced by one in cart successfully.'
              },
              cart: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'mle.mahmoud.yasser@gmail.com'
                  },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '61221141f34a829cdf7ca542'
                        },
                        product: {
                          type: 'string',
                          example: '611f6385628e64b6ff96393c'
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
                            },
                            price: {
                              type: 'string',
                              example: '200'
                            }
                          }
                        },
                        selectedColor: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6146e63c1d67816c6f9d63c7'
                            },
                            color: {
                              type: 'string',
                              example: 'Red'
                            }
                          }
                        },
                        selectedSize: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              example: '6145a458d495858ff0d6e8a5'
                            },
                            color: {
                              type: 'string',
                              example: 'L'
                            }
                          }
                        },
                        totalProductQuantity: {
                          type: 'integer',
                          example: 2
                        },
                        totalProductPrice: {
                          type: 'integer',
                          example: 6200
                        }
                      }
                    }
                  },
                  totalQuantity: {
                    type: 'integer',
                    example: 2
                  },
                  totalPrice: {
                    type: 'integer',
                    example: 6200
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
              message1: {
                type: 'string',
                example: 'No cart found for user with this email.'
              },
              message2: {
                type: 'string',
                example: 'No product found with this ID in the cart.'
              }
            }
          }
        }
      }
    }
  }
};

export const deleteProductFromCart = {
  tags: ['Cart'],
  description:
    'This route allow logged in user/seller/admin to delete product from cart',
  opeationId: 'deleteProductFromCart',
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
  // requestBody: {
  //   required: true,
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'object',
  //         properties: {
  //           selectedColor: {
  //             type: 'string',
  //             required: true
  //           },
  //           selectedSize: {
  //             type: 'string',
  //             required: true
  //           }
  //         }
  //       }
  //     }
  //   }
  // },
  responses: {
    200: {
      description: 'Delete Product From Cart',
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
                example: 'Item deleted from cart successfully.'
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
                example: 'No cart found for the user with this email.'
              },
              message2: {
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

export const deleteCart = {
  tags: ['Cart'],
  description: 'This route allow logged in user/seller/admin to delete cart',
  opeationId: 'deleteCart',
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
      description: 'Delete Cart',
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
                example: 'Cart deleted successfully.'
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
                example: 'No cart found for the user with this email.'
              }
            }
          }
        }
      }
    }
  }
};
