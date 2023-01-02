export const secondaryContact = {
    firstName: {
        type: ['string','null'],
        errorMessage: "Secondary constact first name feild is required"
    },
    lastName: {
        type: ['string','null'],
        errorMessage: "Secondary constact last name feild is required"
    },
    email: {
        type: ['string','null'],
        format:"email",
        nullable: true,
        errorMessage: "Please enter valid secondary email"
    },
    phone: {
        type: ['string','null'],
        errorMessage: "Secondary constact phone feild is required"
    },
}