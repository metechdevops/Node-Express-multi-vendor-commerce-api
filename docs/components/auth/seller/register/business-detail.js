export const businessDetails = {
    category: {
        type: 'string',
        example: "grocery",
    },
    registeredName: {
        type: 'string',
        example: "SuperMart & Co",
    },
    registerationNumber: {
        type: 'string',
        example: "2033-23443-222",
    },
    billingDetails: {
        type: 'object',
        properties: {
            country: { 
                type: 'string',
                example: "UK",
            },      
            registeredAddress: { 
                type: 'string',
                example: "Main william Road, London",
            },    
        }
    },
}