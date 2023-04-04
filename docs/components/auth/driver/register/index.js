import {documentSchema} from "./documents"
import {profileImage} from "./profile-image"
import {USER_ROLE } from "../../../../../src/constants/constants"
import {phoneSchema} from "../../../common/phone.schema"

const DriverSignUpRequestBody = {
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
          'phone',
          'address',
          'role',
          'driverAttributes'
        ],
        properties: {
          firstName: {
            type: 'string',
            required: true,
            example:"eCart"
          },
          lastName: {
            type: 'string',
            required: true,
            example:"driver"
          },
          address: {
            type: 'string',
            required: true,
            example:"Lahore"
          },
          email: {
            type: 'string',
            required: true,
            example:"ecart-driver@mailinator.com"
          },
          password: {
            type: 'string',
            required: true,
            example:"user1234"
          },
          role: {
            type: 'string',
            required: true,
            enum: ['driver'],
            example:"driver"
          },
          phone:phoneSchema,
          profileImage: profileImage,
          driverAttributes: {
            type: 'object',
            required:[
              'nationalIdentityNumber',
              'drivingLicenseNumber',
              'vehicleRegistrationNumber',
              'veichleImage',
              'addressProof',
              'rootPermit',
              'characrCertifiate',
              'certifiedCopy',

            ],
            properties: {
              nationalIdentityNumber: {
                type: 'string',
                required: true,
                example:"34322-33223423-2"
              },
              passportNumber: {
                type: 'string',
                required: true,
                example:"WZSDE33444433"
              },
              drivingLicenseNumber: {
                type: 'string',
                required: true,
                example:"3442333234"
              },
              vehicleRegistrationNumber: {
                type: 'string',
                required: true,
                example:"LED-32345"
              },
              rootPermit: {
                type: 'array',
                items: documentSchema
              },
              characrCertifiate: {
                type: 'array',
                items: documentSchema
              },
              insuranceDocument: {
                type: 'array',
                items: documentSchema
              },
              certifiedCopy: {
                type: 'array',
                items: documentSchema
              },
              veichleImage: {
                type: 'array',
                items: documentSchema
              },
              addressProof: {
                type: 'array',
                items: documentSchema
              },
            }
          }
        }
      }
    }
  }
}

const DriverSignUpResponse200 = {
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
              phone:phoneSchema,
              address: {
                type: 'string',
                example: 'New Main Streen, Brod Road, Taxas'
              },
              profileImage: profileImage,
              driverAttributes: {
                type: 'object',
                properties: {
                  nationalIdentityNumber: {
                    type: 'string',
                    example:"34322-33223423-2"
                  },
                  passportNumber: {
                    type: 'string',
                    example:"WZSDE33444433"
                  },
                  drivingLicenseNumber: {
                    type: 'string',
                    example:"3442333234"
                  },
                  vehicleRegistrationNumber: {
                    type: 'string',
                    example:"LED-32345"
                  },
                  rootPermit: {
                    type: 'array',
                    items: documentSchema
                  },
                  characrCertifiate: {
                    type: 'array',
                    items: documentSchema
                  },
                  insuranceDocument: {
                    type: 'array',
                    items: documentSchema
                  },
                  certifiedCopy: {
                    type: 'array',
                    items: documentSchema
                  },
                  veichleImage: {
                    type: 'array',
                    items: documentSchema
                  },
                  addressProof: {
                    type: 'array',
                    items: documentSchema
                  },
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

const DriverSignUpResponse400 = {
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
            example: `Role must be one of the following: [${USER_ROLE.DRIVER}]`
          },
        }
      }
    }
  }
}

const DriverSignUpResponse409 = {
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
  DriverSignUpRequestBody,
  DriverSignUpResponse200,
  DriverSignUpResponse400,
  DriverSignUpResponse409
}