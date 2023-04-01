import { object } from "joi";
import {ImageSchema} from "./components/common/index"
import {phoneSchema} from "./components/common/phone.schema"

import {
  SellerSignUpRequestBody,
  SellerSignUpResponse200,
  SellerSignUpResponse400,
  SellerSignUpResponse409
} from './components/auth/seller/register';

import {
  DriverSignUpRequestBody,
  DriverSignUpResponse200,
  DriverSignUpResponse400,
  DriverSignUpResponse409
} from './components/auth/driver/register';

const {
  customerProfileRequestBody,
  customerProfileResponse200,
  customerProfileResponse400
} = require ('./components/auth/customer/profile')

const {
  SellerProfileRequestBody,
  SellerProfileResponse200,
  SellerProfileResponse400,
  SellerProfileResponse409
} = require ('./components/auth/seller/profile')

const {
  DriverProfileRequestBody,
  DriverProfileResponse200,
  DriverProfileResponse400,
  DriverProfileResponse409
} = require ('./components/auth/driver/profile')

export const sellerSignUp = {
  tags: ['Auth'],
  description: 'This route allow you to sign up as driver into the api',
  opeationId: 'sellerSignUp',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  requestBody: SellerSignUpRequestBody,
  responses: {
    201: SellerSignUpResponse200,
    400: SellerSignUpResponse400,
    409: SellerSignUpResponse409
  }
};

export const driverSignUp = {
  tags: ['Auth'],
  description: 'This route allow you to sign up as driver into the api',
  opeationId: 'driverSignUp',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  requestBody: DriverSignUpRequestBody,
  responses: {
    201: DriverSignUpResponse200,
    400: DriverSignUpResponse400,
    409: DriverSignUpResponse409
  }
};

export const signUp = {
  tags: ['Auth'],
  description: 'This route allow you to sign up into the api',
  opeationId: 'signUp',
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
            firstName: {
              type: 'string',
              required: true
            },
            lastName: {
              type: 'string',
              required: true
            },
            email: {
              type: 'string',
              required: true
            },
            password: {
              type: 'string',
              required: true
            },
            role: {
              type: 'string',
              required: true,
              enum: ['user']
            },
            phone:phoneSchema,
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
            }
          }
        }
      }
    }
  },
  responses: {
    201: {
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
                  _id: {
                    type: 'string',
                    example: '613395db169b2d0004ddc900'
                  },
                  discountCode: {
                    type: 'string',
                    example: ''
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
    },
    409: {
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
  }
};

export const signIn = {
  tags: ['Auth'],
  description: 'This route allow you to login into the api',
  opeationId: 'signIn',
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
            email: {
              type: 'string',
              example:"ecart-user@mailinator.com",
              required: true
            },
            password: {
              type: 'string',
              example:'user1234',
              required: true
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
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
                example: 'User logged in successfully.'
              },
              user: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '611d08a62fc210a30ecfb75b'
                  },
                  name: {
                    type: 'string',
                    example: 'admin'
                  },
                  username: {
                    type: 'string',
                    example: 'admin'
                  },
                  email: {
                    type: 'string',
                    example: 'admin@ecommerce.com'
                  },
                  role: {
                    type: 'string',
                    example: 'admin'
                  },
                  isEmailVerified: {
                    type: 'boolean',
                    example: false
                  },
                  address: {
                    type: 'string',
                    example: 'Toukh - Egypt'
                  },
                  phone: phoneSchema,
                  profileImage: ImageSchema,
                }
              },
              tokens: {
                type: 'object',
                properties: {
                  accessToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTFkMDU4NWYzODY2MDhlZjIzYzI3OGQiLCJpYXQiOjE2MjkyOTIwMjAsImV4cCI6MTYyOTI5MzgyMCwidHlwZSI6ImFjY2VzcyJ9.qGuYIZQBa2UkB5WkxSy29xNdMWpVlETuK3g7T4R5Fj8'
                  },
                  refreshToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTFkMDU4NWYzODY2MDhlZjIzYzI3OGQiLCJpYXQiOjE2MjkyOTIwMjAsImV4cCI6MTYzMTg4NDAyMCwidHlwZSI6InJlZnJlc2gifQ.pxSceF4uGMlPxaQLjdUiaEdi3ejCxnWPtSApm7BdGCw'
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
                example: 'Please enter both email and password.'
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
                example: 'Incorrect email or password.'
              }
            }
          }
        }
      }
    }
  }
};

export const logout = {
  security: {
    jwt: []
  },
  tags: ['Auth'],
  description: 'This route allow you to logout from the api',
  opeationId: 'logout',
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
            refreshToken: {
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
      description: 'Logout from the api using you refresh token.',
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
                example: 'Logged out successfully.'
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
                example: 'Please login again!'
              }
            }
          }
        }
      }
    }
  }
};

export const generateTokens = {
  security: {
    jwt: []
  },
  tags: ['Auth'],
  description:
    'This route allow the user with a refresh token to regenerate tokens when the access token expires',
  opeationId: 'generateTokens',
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
            refreshToken: {
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
      description:
        'Regenerate tokens and use them to log into the system again.',
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
                example: 'Tokens generated successfully.'
              },
              tokens: {
                type: 'object',
                properties: {
                  accessToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTFkMDhhNjJmYzIxMGEzMGVjZmI3NWIiLCJpYXQiOjE2MjkyOTI3NzgsImV4cCI6MTYyOTI5NDU3OCwidHlwZSI6ImFjY2VzcyJ9.NpXEYDrETL3yZKMLUmAKYrfH1_a2mmoKagP0MPc6HFY'
                  },
                  refreshToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTFkMDhhNjJmYzIxMGEzMGVjZmI3NWIiLCJpYXQiOjE2MjkyOTI3NzgsImV4cCI6MTYzMTg4NDc3OCwidHlwZSI6InJlZnJlc2gifQ.VG-vE3RyQi2SRdDNd_AeHH3Ue9OYtaEE2W_gfNTtE_Q'
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
                example: 'No user found.'
              },
              message2: {
                type: 'string',
                example: 'No token found.'
              }
            }
          }
        }
      }
    }
  }
};

export const forgotPassword = {
  security: {
    jwt: []
  },
  tags: ['Auth'],
  description:
    'This route allow you to send email with the reset password link to reset the password you forgot',
  opeationId: 'forgotPassword',
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
            email: {
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
      description:
        'A link is going now to be sent to you email to reset you password.',
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
                example: 'Reset Password Link Sent Successfully.'
              }
            }
          }
        }
      }
    }
  }
};

export const resetPassword = {
  security: {
    jwt: []
  },
  tags: ['Auth'],
  description:
    'This route allow you to reset you password using the token you received in you email',
  opeationId: 'resetPassword',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'query',
      name: 'token',
      type: 'string',
      required: true
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
              required: true
            },
            passwordConfirmation: {
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
      description: 'Reset you password using the reset token.',
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
                example: 'Password changed successfully.'
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
                example: 'No user found.'
              }
            }
          }
        }
      }
    }
  }
};

export const changePassword = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route allow you to user to change his password',
  opeationId: 'changePassword',
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
            currentPassword: {
              type: 'string',
              required: true
            },
            password: {
              type: 'string',
              required: true
            },
            passwordConfirmation: {
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
      description: 'Change password.',
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
                example: 'Password changed successfully.'
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
                example: 'Password and passwordConfirmation must be the same.'
              },
              message2: {
                type: 'string',
                example:
                  'This is not your password. Please enter the correct current password.'
              }
            }
          }
        }
      }
    }
  }
};

export const sendVerificationEmail = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route will allow you to resend verification token email.',
  opeationId: 'sendVerificationEmail',
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
      description: 'Send verification email.',
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
                example: 'Verification email sent successfully.'
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
                example: 'Email is already verified.'
              },
              message2: {
                type: 'string',
                example:
                  'Email field is required.'
              }
            }
          }
        }
      }
    }
  }
};

export const verifyEmail = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route allow you to verify user email',
  opeationId: 'verifyEmail',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    },
    {
      in: 'query',
      name: 'token',
      type: 'string',
      example: '',
      description:
        'This will include the verification token to verify the user email.'
    },
  ],
  responses: {
    200: {
      description: 'Verify user email.',
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
                example: 'Email verified successfully.'
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
                example: 'No token found'
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Error: 500',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'Error'
              },
              name: {
                type: 'string',
                example: 'Given token is expired'
              }
            }
          }
        }
      }
    }
  }
};


export const updateCustomerProfile = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route allow you update customer user profile',
  opeationId: 'updateCustomerProfile',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  requestBody: customerProfileRequestBody,
  responses: {
    200: customerProfileResponse200,
    400: customerProfileResponse400
  }
};

export const updateSellerProfile = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route allow you update seller profile',
  opeationId: 'updateSellerProfile',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  requestBody: SellerProfileRequestBody,
  responses: {
    200: SellerProfileResponse200,
    400: SellerProfileResponse400,
    409: SellerProfileResponse409
  }
};

export const updateDriverProfile = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: 'This route allow you update seller profile',
  opeationId: 'updateDriverProfile',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  requestBody: DriverProfileRequestBody,
  responses: {
    200: DriverProfileResponse200,
    400: DriverProfileResponse400,
    409: DriverProfileResponse409
  }
};

export const getSellerProfile = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: "This route allow you to get marchent profile data",
  opeationId: 'getSellerProfile',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  responses: {
    200: SellerProfileResponse200,
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
                example: 'No User found.'
              }
            }
          }
        }
      }
    }
  }
};

export const getDriverProfile = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: "This route allow you to get driver profile data",
  opeationId: 'getDriverProfile',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  responses: {
    200: DriverProfileResponse200,
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
                example: 'No Driver found.'
              }
            }
          }
        }
      }
    }
  }
};

export const getCustomerProfile = {
  tags: ['Auth'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: "This route allow you to get customer profile data",
  opeationId: 'getCustomerProfile',
  parameters: [
    {
      in: 'header',
      name: 'Accept-Language',
      type: 'string',
      example: 'en_MX'
    }
  ],
  responses: {
    200: customerProfileResponse200,
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
                example: 'No User found.'
              }
            }
          }
        }
      }
    }
  }
};