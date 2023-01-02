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
    registrationNumber: {
        type: 'string',
        minLength: 1,
        errorMessage: "Business registration feild is required"
    },
    registrationDate: {
        type: 'string',
        format:'date',
        errorMessage: "Registration date feild is required"
    },
    billingDetails: {
        type: 'object',
        required: [
            "country",
            "registeredAddress",
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
        }
    },
}