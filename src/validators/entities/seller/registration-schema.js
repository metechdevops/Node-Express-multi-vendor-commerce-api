import {secondaryContact} from "./register/secondary-conatct"
import {businessDetails} from "./register/business-detail"
import {bankDetail} from "./register/bank-detail"
import {taxationDetail} from "./register/taxation-detail"
import {socialLinks} from "./register/social-links"
import {Branding} from "./register/branding"

const {USER_ROLE} = require('../../../constants/constants')

export const sellerValidationSchema = {
    "type": "object",
    "required": [
        "firstName",
        "lastName",
        "email",
        "password",
        "role",
        "sellerAttributes"
    ],
    "properties": {
        "firstName": {
            "type": "string",
            "minLength": 1,
            "errorMessage": "First name feild is required"
        },
        "lastName": {
            "type": "string",
            "minLength": 1,
            "errorMessage": "Last name feild is required"
        },
        "role": {
            "type": "string",
            "enum": [USER_ROLE.SELLER],
            "errorMessage": `must be equal to one of the allowed values [${USER_ROLE.SELLER}]`
        },
        "email": {
            "type": "string",
            "format":"email",
            "errorMessage": "Email feild is required"
        },
        "password": {
            "type": "string",
            "maxLength":8,
            "minLength":3,
            "errorMessage": "Password must be less than 8 characters and contains letters, numbers, and symbols."
        },
        sellerAttributes: {
            type: "object",
            properties: {
                secondaryContactDetail : {
                    type: 'object',
                    required: [
                        "firstName",
                        "lastName",
                        "email",
                        "phone"
                    ],
                    properties: secondaryContact
                  },
                  businessDetail: {
                    type: 'object',
                    required: [
                        "category",
                        "registeredName",
                        "registerationNumber",
                        "billingDetails"
                    ],
                    properties: businessDetails
                  },
                  bankDetail: {
                    type: 'object',
                    required: [
                        "bankName",
                        "branchName",
                        "branchCode",
                        "accountNumber",
                        "IBANNumber"
                    ],
                    properties: bankDetail
                  },
                  taxationInformation: {
                    type: 'object',
                    required: [
                        "BIRNumber",
                        "taxNumber",
                        "VATNumber"
                    ],
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
    
