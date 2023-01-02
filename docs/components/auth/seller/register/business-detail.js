export const businessDetails = {
    category: {
        type: 'string',
        example: "grocery",
    },
    registeredName: {
        type: 'string',
        example: "SuperMart & Co",
    },
    registrationNumber: {
        type: 'string',
        example: "2033-23443-222",
    },
    registrationDate: {
        type: 'string',
        format: 'date',
        example: "2023-09-01",
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