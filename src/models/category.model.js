import mongoose from 'mongoose';
import toJSON from './plugins/index';
const imageSchema = require('./schema/common/image.schema')

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    image: imageSchema
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);

categorySchema.index({ name: 1, image: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;
