import {phoneSchema} from "../../../common/phone.schema"

export const secondaryContact = {
    firstName: {
        type: 'string',
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
    phone:phoneSchema,
}