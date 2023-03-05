// Packages
import { boolean } from 'joi';
import mongoose from 'mongoose';
import validator from 'validator';

// Plugins
import toJSON from '../plugins/index';
import phoneSchema from '../schema/common/phone.schema';

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
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
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    address: {
      type: String,
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
addressSchema.plugin(toJSON);

const Store = mongoose.model('Address', addressSchema);

export default Store;
