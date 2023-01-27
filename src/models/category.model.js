import mongoose from 'mongoose';
import toJSON from './plugins/index';
const imageSchema = require('./schema/common/image.schema')

const categorySchema = mongoose.Schema(
  {
    product: 
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    parentId: {
      type: String
    },
    description: {
      type: String,
      required: false
    },
    isFeatured: {
      type: Boolean,
      default: false
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
