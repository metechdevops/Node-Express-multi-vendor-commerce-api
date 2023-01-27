// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './../plugins/index';

const storeSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    product: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    }],
    name: {
      type: String,
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
storeSchema.plugin(toJSON);

const Store = mongoose.model('Store', storeSchema);

export default Store;
