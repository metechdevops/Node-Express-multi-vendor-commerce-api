// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/index';

const storeSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    },
    name: {
      type: String,
      required: [true, 'A store must have a name']
    },
    city: {
      type: String,
      required: [true, 'A store must have a city']
    },
    address: {
      type: String,
      required: [true, 'A store must have a address']
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
