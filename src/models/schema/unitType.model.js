// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './../plugins/index';

const unitTypeSchema = mongoose.Schema(
  {
    unitCode: {
      type: String,
    },
    status: {
      enum : ['active','inactive'],
      type: String,
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
unitTypeSchema.plugin(toJSON);

const unitType = mongoose.model('units', unitTypeSchema);

export default unitType;
