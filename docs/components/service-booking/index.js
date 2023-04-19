
import {ImageSchema} from "../common/index"
import {ProductAttributesSchema} from "../common/product.attributes.schema"
import { AddressObject } from "../address";

// Constant
import {
    DURATION_TYPE,
    DURATION_TYPE_ENUM,
  } from "../../../src/constants/constants";

const serviceObjectSchema = {
    durationType: {
        type: 'string',
        required: true,
        example: DURATION_TYPE.HOUR,
        enum: DURATION_TYPE_ENUM
    },
    duration: {
        type: 'integer',
        example: 100,
        required: true
      },
    service: {
        type: 'string',
        example: "642b20577106e797f817ec65",
        required: true
    },
    shippingAddress: AddressObject,
    paymentMethod: {
      type: 'string',
      example: "card",
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
    }
  }

  const getSingleBookingSchema =  {
      _id: {
          type: 'string',
          example: '61251a43c34eabdac042b374'
      },
      totalPrice: {
        type: 'integer',
        example: 6200
      },
      status: {
        type: 'string',
        example: "pending"
      },
      paymentStatus: {
          type: 'string',
          example: "paid"
        },
      service: {
          type: 'string',
          example: '611d0cf2ab79f9bb0c388234'
      },
      seller: {
          type: 'string',
          example: '611d0cf2ab79f9bb0c388234'
      },
      user: {
        type: 'string',
        example: '611d0cf2ab79f9bb0c388234'
      },
      bookingDate: {
        type: 'string',
        example: '2021-08-24T16:11:47.502Z'
      },
      shippingAddress: AddressObject,
      paymentMethod: {
        type: 'string',
        example: 'card'
      },
      serviceTracking: {
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


const addServiceBookingRequestBody = {
    description: 'Book new service request body.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: [
            "paymentMethod",
            "description",
            "service",
            "durationType",
            "duration",
            "shippingAddress",
            "cardNumber",
            "cardHolderName",
            "expMonth",
            "expYear",
            "cvc"
          ],
          properties: serviceObjectSchema
        }
      }
    }
}

const updateServiceBookingBody = {
  description: 'Update service request body.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: [
          "name",
          "description",
          "category",
          "durationType",
          "price",
        ],
        properties: {
          name: {
            type: 'string',
            maxLength: 120,
            example:"Test service"
          },
          description: {
            type: 'string',
            maxLength: 500,
            example:"This is test service description"
          },
          shortDescription: {
              type: 'string',
              maxLength: 250,
              example:"This is test service short description"
            },
          category: {
            type: 'string',
            example:"611d08a62fc210a30ecfb75b"
          },
          subCategory: {
            type: 'string',
            example:"611d08a62fc210a30ecfb75b"
          },
          durationType: {
              type: 'string',
              example:"hourly"
          },
          price: {
            type: 'integer',
            example: 200
          },
          isFeatured: {
            type: 'boolean',
            example: false
          },
          mainImage: ImageSchema,
          images: {
            type: 'array',
            items: ImageSchema
          },
          attributes: {
            type: 'array',
            items: ProductAttributesSchema
          },
          tags: {
              type: 'array',
              items: {
                  type: "string",
                  example:"tag1, tag2, tag3"
              }
          }
        }
      }
    }
  }
}

const addServiceBooking201 = {
    description:
      'Create new booking | paymentMethod: "card" | cardNumber: 4242424242424242 | cardHolderName: 4242424242424242 | expMonth: 4 | expYear: 2022 |g cvc: 247',
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
              example: 'Service Booking Created Successfully.'
            },
            booking:{ 
              type: 'object',
              properties: getSingleBookingSchema
            },
            paymentResponse : {
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
                ServiceBookingIdentifier: {
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

  const getAllServiceBooking200 = {
    description: 'Get all service bookings',
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
              example: 'Service Bookings Found Successfully.'
            },
            bookings: {
              type: 'array',
              items: {
                type: 'object',
                properties: getSingleBookingSchema
              }
            }
          }
        }
      }
    }
  }



const addServiceBooking400 = {
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
              example: 'All fields are required.'
            }
          }
        }
      }
    }
}


module.exports = {
    serviceObjectSchema,
    getSingleBookingSchema,
    addServiceBookingRequestBody,
    updateServiceBookingBody,
    addServiceBooking201,
    getAllServiceBooking200,
    addServiceBooking400
}