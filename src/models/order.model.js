import mongoose from 'mongoose';
import validator from 'validator';

import { 
  ORDER_STATUS,
  ORDER_STATUS_ENUM 
} from '../constants/constants';
import toJSON from './plugins/index';

import phoneSchema from './schema/common/phone.schema';

const orderSchema = mongoose.Schema(
  {
    products: Array,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },
    deliveredAt: {
      type: Date
    },
    shippingAddress: {
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
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentStripeId: {
      type: String
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    phone: {
      type: String,
      required: [true, 'Phone Is Required']
    },
    status: {
      type: String,
      default: ORDER_STATUS.PENDING,
      enum: ORDER_STATUS_ENUM
    },
    orderTracking: [
      { 
        status:{
          type: String,
          default: ORDER_STATUS.PENDING,
          enum: ORDER_STATUS_ENUM
        },
        trackingDate: {
          type: Date,
          default: Date.now,
        }
      }
    ]
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);

const Order = mongoose.model('Order', orderSchema);

export default Order;
