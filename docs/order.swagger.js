import { AddressObject } from "./components/address";

export const getAllOrders = {
  tags: ['Order'],
  description: 'This route allow logged in user/seller/admin get his orders',
  opeationId: 'getAllOrders',
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
      in: 'query',
      name: 'filter',
      type: 'string',
      example: 'card',
      description:
        'This will filter all orders and select only order that contain the word you insert and search in all user fields about this word'
    },
    {
      in: 'query',
      name: 'select',
      type: 'string',
      example: 'totalPrice',
      description: 'Select only fields you want.'
    },
    {
      in: 'query',
      name: 'user',
      type: 'string',
      example: '',
      description: 'Filters order by seller id.'
    },
    {
      in: 'query',
      name: 'status',
      type: 'string',
      example: '',
      description: 'Filters order by status.'
    },
    {
      in: 'query',
      name: 'limit',
      type: 'string',
      example: '5',
      description:
        'Limit the number of orders from for example 20 order to 5 orders.'
    },
    {
      in: 'query',
      name: 'sort',
      type: 'string',
      example: '-1, totalPrice',
      description:
        'Sorting orders according to specified field for example the name field, and the number before the field name indicates the order of items: descending (-1) or ascending (1)'
    },
    {
      in: 'query',
      name: 'page',
      type: 'string',
      example: '2',
      description:
        'When number of orders is greater than 10 orders, it divides into pages each page contain 10 orders.'
    }
  ],
  responses: {
    201: {
      description: 'Get all orders',
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
                example: 'Orders Found Successfully.'
              },
              orders: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    products: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            example: '61251a32c34eabdac042b36f'
                          },
                          product: {
                            type: 'string',
                            example: '611f6385628e64b6ff96393c'
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
                    totalPrice: {
                      type: 'integer',
                      example: 6200
                    },
                    isPaid: {
                      type: 'boolean',
                      example: true
                    },
                    isDelivered: {
                      type: 'boolean',
                      example: false
                    },
                    taxPrice: {
                      type: 'integer',
                      example: 0
                    },
                    shippingPrice: {
                      type: 'integer',
                      example: 0
                    },
                    status: {
                      type: 'string',
                      example: 'Not Processed'
                    },
                    _id: {
                      type: 'string',
                      example: '61251a43c34eabdac042b374'
                    },
                    user: {
                      type: 'string',
                      example: '611d0cf2ab79f9bb0c388234'
                    },
                    paidAt: {
                      type: 'string',
                      example: '2021-08-24T16:11:47.502Z'
                    },
                    shippingAddress: AddressObject,
                    paymentMethod: {
                      type: 'string',
                      example: 'card'
                    },
                    phone: {
                      type: 'string',
                      example: '01004468937'
                    },
                    orderTracking: {
                      type: 'array',
                      items: {
                          type: 'object',
                          properties: {
                            status: {
                              type: 'string',
                              example: 'pending'
                            },
                            trackingDate: {
                              type: 'string',
                              example: '2023-03-02T20:15:42.386+00:00'
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
  }
};

export const getOrder = {
  tags: ['Order'],
  description:
    "This route allow logged in user/seller/admin get specific order using it's ID",
  opeationId: 'getOrder',
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
      name: 'id',
      type: 'integer',
      description: 'Order ID'
    }
  ],
  responses: {
    200: {
      description: "Get specific order using it's ID",
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
                example: 'Order found successfully.'
              },
              order: {
                type: 'object',
                properties: {
                  products: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '61251a32c34eabdac042b36f'
                        },
                        product: {
                          type: 'string',
                          example: '611f6385628e64b6ff96393c'
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
                  totalPrice: {
                    type: 'integer',
                    example: 6200
                  },
                  isPaid: {
                    type: 'boolean',
                    example: true
                  },
                  isDelivered: {
                    type: 'boolean',
                    example: false
                  },
                  taxPrice: {
                    type: 'integer',
                    example: 0
                  },
                  shippingPrice: {
                    type: 'integer',
                    example: 0
                  },
                  status: {
                    type: 'string',
                    example: 'Not Processed'
                  },
                  _id: {
                    type: 'string',
                    example: '61251a43c34eabdac042b374'
                  },
                  user: {
                    type: 'string',
                    example: '611d0cf2ab79f9bb0c388234'
                  },
                  paidAt: {
                    type: 'string',
                    example: '2021-08-24T16:11:47.502Z'
                  },
                  shippingAddress: AddressObject,
                  paymentMethod: {
                    type: 'string',
                    example: 'card'
                  },
                  phone: {
                    type: 'string',
                    example: '01004468937'
                  },
                  orderTracking: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                          status: {
                            type: 'string',
                            example: 'pending'
                          },
                          trackingDate: {
                            type: 'string',
                            example: '2023-03-02T20:15:42.386+00:00'
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
                example: 'No order found.'
              }
            }
          }
        }
      }
    }
  }
};

export const createNewOrder = {
  tags: ['Order'],
  description: 'This route allow logged in user/seller/admin create new order',
  opeationId: 'createNewOrder',
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
            shippingAddress: AddressObject,
            paymentMethod: {
              type: 'string',
              example: "card",
              required: true
            },
            phone: {
              type: 'string',
              example: "+92333333333",
              required: true
            },
            cardNumber: {
              type: 'string',
              example: "4012000000020071",
              required: true
            },
            cardHolderName: {
              type: 'string',
              example: "John Doe",
              required: true
            },
            expMonth: {
              type: 'integer',
              example: 12,
              required: true
            },
            expYear: {
              type: 'integer',
              example: 24,
              required: true
            },
            cvc: {
              type: 'integer',
              example: 123,
              required: true
            },
            callBack: {
              type: 'string',
              example: "https://brilliant-choux-5f0d16.netlify.app/payment/authentication",
              required: true
            }
          }
        }
      }
    }
  },
  responses: {
    201: {
      description:
        'Create new order | paymentMethod: "card" | cardNumber: 4242424242424242 | cardHolderName: 4242424242424242 | expMonth: 4 | expYear: 2022 |g cvc: 247',
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
                example: 'Order Created Successfully.'
              },
              order: {
                type: 'object',
                properties: {
                  products: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '61251a32c34eabdac042b36f'
                        },
                        product: {
                          type: 'string',
                          example: '611f6385628e64b6ff96393c'
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
                  totalPrice: {
                    type: 'integer',
                    example: 6200
                  },
                  isPaid: {
                    type: 'boolean',
                    example: true
                  },
                  isDelivered: {
                    type: 'boolean',
                    example: false
                  },
                  taxPrice: {
                    type: 'integer',
                    example: 0
                  },
                  shippingPrice: {
                    type: 'integer',
                    example: 0
                  },
                  status: {
                    type: 'string',
                    example: 'Not Processed'
                  },
                  _id: {
                    type: 'string',
                    example: '61251a43c34eabdac042b374'
                  },
                  user: {
                    type: 'string',
                    example: '611d0cf2ab79f9bb0c388234'
                  },
                  paidAt: {
                    type: 'string',
                    example: '2021-08-24T16:11:47.502Z'
                  },
                  shippingAddress: AddressObject,
                  paymentMethod: {
                    type: 'string',
                    example: 'card'
                  },
                  phone: {
                    type: 'string',
                    example: '01004468937'
                  },
                  orderTracking: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                          status: {
                            type: 'string',
                            example: 'pending'
                          },
                          trackingDate: {
                            type: 'string',
                            example: '2023-03-02T20:15:42.386+00:00'
                          }
                        }
                    }
                  }
                }
              },
              paymentPage: {
                type: 'object',
                properties: {
                  TransactionType: {
                    type: 'number',
                    example: 1
                  },
                  Approved: {
                    type: 'boolean',
                    example: false
                  },
                  TransactionIdentifier: {
                    type: 'string',
                    example: "63e0c4440442712dde689a4a"
                  },
                  IsoResponseCode: {
                    type: 'string',
                    example: "SP4"
                  },
                  ResponseMessage: {
                    type: 'string',
                    example: "SPI Preprocessing complete"
                  },
                  OrderIdentifier: {
                    type: 'string',
                    example: "63f3cffdfbb76cfe84dda0df"
                  },
                  RedirectData: {
                    type: 'string',
                    example: "<!DOCTYPE html><html><head></head><body><form id='powertranz_spi' name='powertranz_spi' action='https://staging.ptranz.com/api/spi/Conductor' method='POST'><input name='SpiToken' id='SpiToken' type='hidden' value='1umyy1qo69urxcaeagz6de1slqo5ro4n5thsqami954yrgixu-3plyg9wt7wz'><input name='browserLanguage' id='browserLanguage' type='hidden' value=''><input name='browserWidth' id='browserWidth' type='hidden' value=''><input name='browserHeight' id='browserHeight' type='hidden' value=''><input name='browserTimeZone' id='browserTimeZone' type='hidden' value=''><input name='browserJavaEnabled' id='browserJavaEnabled' type='hidden' value=''><input name='browserJavascriptEnabled' id='browserJavascriptEnabled' type='hidden' value=''><input name='browserColorDepth' id='browserColorDepth' type='hidden' value=''></form><script>function GetBrowserInfo(){const n=window&&window.screen?window.screen.width:'',e=window&&window.screen?window.screen.height:'',w=window&&window.screen?window.screen.colorDepth:'',o=window&&window.navigator?window.navigator.userAgent:'',i=!(!window||!window.navigator)&&navigator.javaEnabled();let a='';return window&&window.navigator&&(a=window.navigator.language?window.navigator.language:window.navigator.browserLanguage),{screenWidth:n,screenHeight:e,colorDepth:w,userAgent:o,timeZoneOffset:(new Date).getTimezoneOffset(),language:a,javaEnabled:i,javascriptEnabled:!0}}</script><script>function GetBrowserInfoAndSubmit(){var e=GetBrowserInfo();document.getElementById('browserLanguage').value=e.language,document.getElementById('browserWidth').value=e.screenWidth,document.getElementById('browserHeight').value=e.screenHeight,document.getElementById('browserTimeZone').value=e.timeZoneOffset,document.getElementById('browserJavaEnabled').value=e.javaEnabled,document.getElementById('browserJavascriptEnabled').value=e.javascriptEnabled,document.getElementById('browserColorDepth').value=e.colorDepth,document.forms[0].submit()}GetBrowserInfoAndSubmit();</script></body></html>"
                  },
                  SpiToken: {
                    type: 'string',
                    example: "1umyy1qo69urxcaeagz6de1slqo5ro4n5thsqami954yrgixu-3plyg9wt7wz"
                  },
                }
              }
            }
          }
        }
      }
    }
  }
};

export const orderStatus = {
  tags: ['Order'],
  description: 'This route allow logged in seller update order status',
  opeationId: 'orderStatus',
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
      name: 'id',
      type: 'integer',
      description: 'Order ID'
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              required: true,
              example:
                'pending | processing | shipped | delivered | cancelled'
            }
          }
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Update order status',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'Success'
              },
              message1: {
                type: 'string',
                example: 'Order status updated successfully.'
              },
              message2: {
                type: 'string',
                example: 'Order cancelled successfully.'
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
              message1: {
                type: 'string',
                example: 'All fields are required.'
              },
              message2: {
                type: 'string',
                example:
                  'Sorry by status must be one of the following: Not Processed, Processing, Shipped, Delivered, Cancelled.'
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
                example: 'No order found'
              },
              message2: {
                type: 'string',
                example: 'No product found with this ID'
              }
            }
          }
        }
      }
    }
  }
};

export const cancelOrder = {
  tags: ['Order'],
  description:
    "This route allow logged in user/seller/admin cancel specific order using it's ID",
  opeationId: 'cancelOrder',
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
      name: 'id',
      type: 'integer',
      description: 'Order ID'
    }
  ],
  responses: {
    200: {
      description: "Cancel specific order using it's ID",
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
                example: 'Order cancelled successfully.'
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
                example: 'No order found.'
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
