import {secondaryContact} from "./register/secondary-conatct"
import {businessDetails} from "./register/business-detail"
import {bankDetail} from "./register/bank-detail"
import {taxationDetail} from "./register/taxation-detail"
import {socialLinks} from "./register/social-links"
import {Branding} from "./register/branding"

const {USER_ROLE} = require('../../../constants/constants')

const documentSchema = {  
  type:"object",
  properties:{
    link: {
      type: 'string',
      format: 'url',
    },
    s3Id: {
      type: 'string',
    },
  }   
}

const requiredDocumentSchema = {  
  type:"object",
  required:['link','s3Id'],
  properties:{
    link: {
      type: 'string',
      format: 'url',
      errorMessage: "Document link feild is required"
    },
    s3Id: {
      type: 'string',
      "errorMessage": "Document S3 ID feild is required"
    },
  }   
}


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
            "maxLength":30,
            "minLength":3,
            "errorMessage": "Password must be less than 8 characters and contains letters, numbers, and symbols."
        },
        sellerAttributes: {
            type: "object",
            required:[
              'businessDetail',
              'bankDetail',
              'taxationInformation',
              'branding',
              'registrationCertificates',
              'addressOfProof',
              'bankStatments'
            ],
            properties: {
                secondaryContactDetail : {
                    type: 'object',
                    properties: secondaryContact
                  },
                  businessDetail: {
                    type: 'object',
                    required: [
                        "category",
                        "registeredName",
                        "registrationNumber",
                        "billingDetails"
                    ],
                    properties: businessDetails
                  },
                  bankDetail: {
                    type: 'object',
                    required: [
                        "bankName",
                        "accountNumber",
                        "accountTitle"
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
                    properties: Branding
                  },
                  registrationCertificates: {
                    type: 'array',
                    minItems: 1,
                    items: requiredDocumentSchema
                  },
                  addressOfProof: {
                    type: 'array',
                    minItems: 1,
                    items: requiredDocumentSchema
                  },
                  birCertificates: {
                    type: 'array',
                    items: documentSchema
                  },
                  bankStatments: {
                    type: 'array',
                    minItems: 1,
                    items: requiredDocumentSchema
                  },
                  VATDocuments: {
                    type: 'array',
                    items: documentSchema
                  },
                  incomeTAX: {
                    type: 'array',
                    items: documentSchema
                  }
                }
            }
        }

    }
    
