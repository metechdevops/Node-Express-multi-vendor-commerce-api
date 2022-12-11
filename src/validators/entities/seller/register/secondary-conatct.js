export const secondaryContact = {
    firstName: {
        type: 'string',
        minLength: 1,
        errorMessage: "Secondary constact first name feild is required"
    },
    lastName: {
        type: 'string',
        minLength: 1,
        errorMessage: "Secondary constact last name feild is required"
    },
    email: {
        type: 'string',
        minLength: 1,
        format:"email",
        errorMessage: "Secondary constact email feild is required"
    },
    phone: {
        type: 'string',
        minLength: 1,
        errorMessage: "Secondary constact phone feild is required"
    },
}