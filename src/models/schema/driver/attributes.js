import mongoose from 'mongoose';

module.exports = mongoose.Schema({
    secondaryContactDetail:{
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: [false, 'Please provide an email'],
            unique: false,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
                }
            }
        },
        phone: {
            type: String
        },
    },
    businessDetail:{
        category: {
            type: String,
        },
        registeredName: {
            type: String,
        },
        registrationNumber: {
            type: String,
        },
        billingDetails:{
            country: {
                type: String,
            },
            registeredAddress: {
                type: String,
            },
            primaryPhone: {
                type: String,
            },
            primaryEmail: {
                type: String,
                required: [false, 'Please provide an email'],
                unique: false,
                trim: true,
                lowercase: true,
                validate(value) {
                    if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                    }
                }
            },
            secondaryPhone: {
                type: String,
            },
            secondaryEmail: {
                type: String,
                required: [false, 'Please provide an email'],
                unique: false,
                trim: true,
                lowercase: true,
                validate(value) {
                    if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                    }
                }
            }
        }
    },
    bankDetail: {
        bankName: {
            type: String,
            default: ""
        },
        branchName: {
            type: Number,
            default: ""
        },
        branchCoe: {
            type: Number,
            default: ""
        },
        accountNumber: {
            type: Number,
            default: ""
        },
        IBANNumber: {
            type: Number,
            default: ""
        }
    },
    taxationInformation:{
        BIRNumber: {
            type: Number,
            default: ""
        },
        taxNumber: {
            type: Number,
            default: ""
        },
        VATNumber: {
            type: Number,
            default: ""
        }
    },
    socialLinks: {
        facebook: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        youtube: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        linkedIn: {
            type: String,
            default: ""
        },
        tikTok: {
            type: String,
            default: ""
        },
    },
    branding:{
        logo: {
            type: String,
            default: ""
        },
        bannerImage: {
            type: String,
            default: ""
        }
    },
  },
);
