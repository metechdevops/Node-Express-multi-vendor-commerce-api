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


export const driverValidationSchema = {
    "type": "object",
    "required": [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "password",
        "role",
        "driverAttributes"
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
        "address": {
            "type": "string",
            "minLength": 1,
            "errorMessage": "Address feild is required"
        },
        "phone": {
            type: "object",
            required:[
              'code',
              'number',
            ],
            properties: {
                "code": {
                    "type": "string",
                    "minLength": 3,
                    "errorMessage": "Country code feild is required"
                },
                "number": {
                    "type": "string",
                    "minLength": 7,
                    "errorMessage": "Phone number code feild is required"
                },
            }
        },
        "role": {
            "type": "string",
            "enum": [USER_ROLE.DRIVER],
            "errorMessage": `must be equal to one of the allowed values [${USER_ROLE.DRIVER}]`
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
        driverAttributes: {
            type: "object",
            required:[
              'nationalIdentityNumber',
              'drivingLicenseNumber',
              'vehicleRegistrationNumber',
              'rootPermit',
              'characrCertifiate',
              'insuranceDocument',
              'certifiedCopy',
              "veichleImage",
              "addressProof"
            ],
            properties: {
                nationalIdentityNumber:{
                    type: "string",
                    minLength: 1,
                    errorMessage: "nationalIdentityNumber feild is required"
                },
                passportNumber:{
                    type: "string",
                    errorMessage: "passportNumber feild is required"
                },
                drivingLicenseNumber:{
                    type: "string",
                    minLength: 1,
                    errorMessage: "drivingLicenseNumber feild is required"
                },
                vehicleRegistrationNumber:{
                    type: "string",
                    minLength: 1,
                    errorMessage: "vehicleRegistrationNumber feild is required"
                },
                rootPermit: {
                    type: 'array',
                    minItems: 1,
                    items: requiredDocumentSchema
                },
                characrCertifiate: {
                    type: 'array',
                    minItems: 1,
                    items: documentSchema
                },
                insuranceDocument: {
                    type: 'array',
                    items: requiredDocumentSchema
                },
                certifiedCopy: {
                    type: 'array',
                    minItems: 1,
                    items: documentSchema
                },
                veichleImage: {
                    type: 'array',
                    minItems: 1,
                    items: documentSchema
                },
                addressProof: {
                    type: 'array',
                    minItems: 1,
                    items: documentSchema
                }
            }
            }
        }

    }
    
