import {profileImage} from "../../seller/register/profile-image"
import { USER_ROLE } from "../../../../../src/constants/constants"

const customerProfileRequestBody = {
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
        }
      }
    }
  }
}

const customerProfileResponse200 = {
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
              'Customer profile updted successfull!'
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
              profileImage: profileImage,
            }
          }
        }
      }
    }
  }
}

const customerProfileResponse400 = {
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
        }
      }
    }
  }
}

module.exports = {
  customerProfileRequestBody,
  customerProfileResponse200,
  customerProfileResponse400,
}