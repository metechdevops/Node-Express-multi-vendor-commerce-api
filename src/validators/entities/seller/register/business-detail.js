export const businessDetails = {
    category: {
        type: 'string',
        minLength: 1,
        errorMessage: "Business category feild is required"
    },
    registeredName: {
        type: 'string',
        minLength: 1,
        errorMessage: "Business registered name feild is required"
    },
    registerationNumber: {
        type: 'string',
        minLength: 1,
        errorMessage: "Business registration feild is required"
    },
    billingDetails: {
        type: 'object',
        required: [
            "country",
            "registeredAddress",
            "primaryPhone",
            "primaryEmail",
            "secondaryPhone",
            "secondaryEmail"
        ],
        properties: {
            country: { 
                type: 'string',
                minLength: 1,
                errorMessage: "Business billing country feild is required"
            },      
            registeredAddress: { 
                type: 'string',
                minLength: 1,
                errorMessage: "Business registered address feild is required"
            },      
            primaryPhone: { 
                type: 'string',
                minLength: 1,
                errorMessage: "Business primary phone feild is required"
            },      
            primaryEmail: { 
                type: 'string',
                minLength: 1,
                format:"email",
                errorMessage: "Business email feild is required"
            },      
            secondaryPhone: { 
                type: 'string',
                minLength: 1,
                errorMessage: "Business secondary phone feild is required"
            },      
            secondaryEmail: { 
                type: 'string',
                minLength: 1,
                errorMessage: "Business secondary email feild is required"
            },      
        }
    },
}