export const secondaryContact = {
    firstName: {
        type: 'string',
        minLength: 1,
        example:"Olery",
    },
    lastName: {
        type: 'string',
        example:"William",
    },
    email: {
        type: 'string',
        example:"ecart-william@mailinator.com",
        format:"email",
    },
    phone: {
        type: 'string',
        example:"(023)-2232-3232",
    },
}