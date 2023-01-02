import mongoose from 'mongoose';
import validator from 'validator';

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
        registrationDate: {
            type: Date,
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
            type: String,
            default: ""
        },
        branchCode: {
            type: Number,
            default: ""
        },
        accountNumber: {
            type: Number,
            default: ""
        },
        accountTitle: {
            type: String,
            default: ""
        },
        IBANNumber: {
            type: String,
            default: ""
        }
    },
    taxationInformation:{
        BIRNumber: {
            type: String,
            default: ""
        },
        taxNumber: {
            type: String,
            default: ""
        },
        VATNumber: {
            type: String,
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
            original: {
                type: String
            },
            web: {
                type: String,
            },
            mobile: {
                type: String
            },
        },
        bannerImage: {
            original: {
                type: String
            },
            web: {
                type: String
            },
            mobile: {
                type: String
            },
        }
    },
  },
);
