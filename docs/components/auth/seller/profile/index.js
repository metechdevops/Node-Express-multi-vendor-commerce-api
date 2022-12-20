import {secondaryContact} from "./secondary-conatct"
import {businessDetails} from "./business-detail"
import {bankDetail} from "./bank-detail"
import {taxationDetail} from "./taxation-detail"
import {socialLinks} from "./social-links"
import {Branding} from "./branding"
import {profileImage} from "./profile-image"
import { USER_ROLE } from "../../../../../src/constants/constants"

const SellerSignUpRequestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            required: true,
            example:"ecart"
          },
          lastName: {
            type: 'string',
            required: true,
            example:"seller"
          },
          profileImage: profileImage,
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
              profileImage: profileImage,
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
            example: `Role must be one of the following: [${USER_ROLE.SELLER}]`
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