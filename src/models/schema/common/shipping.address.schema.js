import mongoose from 'mongoose';
import validator from 'validator';

import phoneSchema from './../../schema/common/phone.schema';

module.exports = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    phone: phoneSchema,
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  });
