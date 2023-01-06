import {secondaryContact} from "./secondary-conatct"
import {businessDetails} from "./business-detail"
import {bankDetail} from "./bank-detail"
import {taxationDetail} from "./taxation-detail"
import {socialLinks} from "./social-links"
import {Branding} from "./branding"

import { USER_ROLE } from "../../../../constants/constants"

const SellerSignUpRequestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required:[
          'firstName',
          'lastName',
          'email',
          'password',
          'role',
          'sellerAttributes'
        ],
        properties: {
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          email: {
            type: 'string',
            format:'email'
          },
          password: {
            type: 'string'
          },
          role: {
            type: 'string',
            enum: [
              USER_ROLE.SELLER,
              USER_ROLE.USER,
            ]
          },
          profileImage: {
            type: 'object',
            properties: {
              original: {
                type: 'string',
                format: 'url'
              },
              web: {
                type: 'string',
                format: 'url'
              },
              mobile: {
                type: 'string',
                format: 'url'
              }
            }
          },
          sellerAttributes: {
            type: 'object',
            required:[
              'businessDetail',
              'bankDetail',
              'taxationInformation',
              'branding'
            ],
            properties: {
              secondaryContactDetail : {
                type: 'object',
                properties: secondaryContact
              },
              businessDetail: {
                type: 'object',
                required:[
                  'category',
                  'registeredName',
                  'registrationNumber',
                  'registrationDate',
                  'billingDetails',
                ],
                properties: businessDetails
              },
              bankDetail: {
                type: 'object',
                required:[
                  'bankName',
                  'accountNumber',
                  'accountTitle',
                ],
                properties: bankDetail
              },
              taxationInformation: {
                type: 'object',
                properties: taxationDetail
              },
              socialLinks: {
                type: 'object',
                properties:socialLinks
              },
              branding: {
                type: 'object',
                required:[
                  'logo',
                  'bannerImage'
                ],
                properties: Branding
              }
            }
          }
        }
      }
    }
  }
}

const SellerSignUpResponse200 = {
  description: 'User data with access token and refresh token',
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
            example:
              'Account created successfull, please verify your email!'
          },
          user: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '613395db169b2d0004ddc900'
              },
              firstName: {
                type: 'string',
                example: 'user'
              },
              lastName: {
                type: 'string',
                example: 'account'
              },
              email: {
                type: 'string',
                example: 'usr@ecommerce.com'
              },
              password: {
                type: 'string',
                example: 'User_123456789'
              },
              role: {
                type: 'string',
                example: 'user'
              },
              isEmailVerified: {
                type: 'boolean',
                example: false
              },
              profileImage: {
                type: 'object',
                properties: {
                  original: {
                    type:"string",
                    example: "https://res.cloudinary.com/dknma8cck/image/upload/v1629291909/EcommerceAPI/Users/admin/xxcrbfkwglqa5c5kay4u.webp",
                  },
                  web: {
                    type:"string",
                    example: "https://res.cloudinary.com/dknma8cck/image/upload/v1629291909/EcommerceAPI/Users/admin/xxcrbfkwglqa5c5kay4u.webp",
                  },
                  mobile: {
                    type:"string",
                    example: "https://res.cloudinary.com/dknma8cck/image/upload/v1629291909/EcommerceAPI/Users/admin/xxcrbfkwglqa5c5kay4u.webp",
                  },  
                }
              },
              discountCode: {
                type: 'string',
                example: ''
              },
              sellerAttributes: {
                type: 'object',
                properties: {
                  secondaryContactDetail : {
                    type: 'object',
                    properties: secondaryContact
                  },
                  businessDetail: {
                    type: 'object',
                    properties: businessDetails
                  },
                  bankDetail: {
                    type: 'object',
                    properties: bankDetail
                  },
                  taxationInformation: {
                    type: 'object',
                    properties: taxationDetail
                  },
                  socialLinks: {
                    type: 'object',
                    properties:socialLinks
                  },
                  branding: {
                    type: 'object',
                    properties: Branding
                  }
                }
              }
            }
          },
          tokens: {
            type: 'object',
            properties: {
              accessToken: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTFkMDU4NWYzODY2MDhlZjIzYzI3OGQiLCJpYXQiOjE2MjkyOTE5MDksImV4cCI6MTYyOTI5MzcwOSwidHlwZSI6ImFjY2VzcyJ9.Y-lxrp2xmLGR-pSxaqiq2A6QvcVOmqoX90aZ7y0gQgM'
              },
              refreshToken: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTFkMDU4NWYzODY2MDhlZjIzYzI3OGQiLCJpYXQiOjE2MjkyOTE5MDksImV4cCI6MTYzMTg4MzkwOSwidHlwZSI6InJlZnJlc2gifQ.6uK5RpgM-OLjC-WxBFT8I7CuVRgfwV4IFXQ8khOZ43Q'
              }
            }
          }
        }
      }
    }
  }
}

const SellerSignUpResponse400 = {
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
            example: 'Profile Image Is Required, Please Upload an Image'
          },
          message2: {
            type: 'string',
            example: 'All Fields Are Required'
          },
          message3: {
            type: 'string',
            example:
              'Password must be longer than 8 characters and contains letters, numbers, and symbols'
          },
          message4: {
            type: 'string',
            example: 'Role must be one of the following: user'
          },
        }
      }
    }
  }
}

const SellerSignUpResponse409 = {
  description: 'Error: 409',
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
            example: 'Email Is Already Taken: {email}'
          }
        }
      }
    }
  }
}

module.exports = {
  SellerSignUpRequestBody,
  SellerSignUpResponse200,
  SellerSignUpResponse400,
  SellerSignUpResponse409
}