export const secondaryContact = {
    firstName: {
        type: 'string',
        errorMessage: "Secondary constact first name feild is required"
    },
    lastName: {
        type: 'string',
        errorMessage: "Secondary constact last name feild is required"
    },
    email: {
        type: 'string',
        // format:"email",
        errorMessage: "Please enter valid secondary email"
    },
    phone: {
        type: 'string',
        errorMessage: "Secondary constact phone feild is required"
    },
}