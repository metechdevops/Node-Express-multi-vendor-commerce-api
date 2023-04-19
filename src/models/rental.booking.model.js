// NPM Packages
import mongoose from 'mongoose';
const _ = require('lodash');

// Constant
import {
  BOOKING_STATUS,
  DURATION_TYPE,
  BOOKING_STATUS_ENUM,
  DURATION_TYPE_ENUM,
  PAYMENT_STATUS_ENUM,
  PAYMENT_STATUS
} from '../constants/constants';

// Plugins
import toJSON from './plugins/index';
import shippingAddressSchema from './schema/common/shipping.address.schema';

// Schema Defination
const rentalBookingSchema = mongoose.Schema(
  {
    price: {
      type: Number,
      required: false,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: false,
      default: 0
    },
    currency: {
      type: String,
    },
    durationType : {
      type: String,
      enum: DURATION_TYPE_ENUM,
      default: DURATION_TYPE.HOUR
    },
    duration : {
      type: Number,
      required: false,
      default: 0
    },
    shippingAddress: shippingAddressSchema,
    paymentStatus: {
      type: String,
      default: PAYMENT_STATUS.PENDING,
      enum: PAYMENT_STATUS_ENUM
    },
    status: {
      type: String,
      default: BOOKING_STATUS.PENDING,
      enum: BOOKING_STATUS_ENUM
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentIdentifier: {
      type: String
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    rental: {
      type: mongoose.Types.ObjectId,
      ref: 'Service'
    },
    bookingDate: { 
      type: Date, 
      default: Date.now 
    },
    rentalTracking: [
      { 
        status:{
          type: String,
          default: BOOKING_STATUS.PENDING,
          enum: BOOKING_STATUS_ENUM
        },
        trackingDate: {
          type: Date,
          default: Date.now,
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// add plugin that converts mongoose to json
rentalBookingSchema.plugin(toJSON);


// DOCUMENT MIDDLEWARE: runs before .save() and .create() !.update()
// rentalBookingSchema.pre('save', function (next) {
//   this.totalPrice = _.round(this.duration * this.price,2)
//   next();
// });

const Service = mongoose.model('RentalBooking', rentalBookingSchema);

export default Service;
