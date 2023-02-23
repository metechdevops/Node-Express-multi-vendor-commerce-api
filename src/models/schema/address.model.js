// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from '../plugins/index';

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    city: {
      type: String,
    },
    state: {
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
