import mongoose from 'mongoose';
import toJSON from './plugins/index';
import {CATEGORY_TYPE_ENUM,CATEGORY_TYPE} from '../constants/constants';
const imageSchema = require('./schema/common/category.image.schema.js')

const categorySchema = mongoose.Schema(
  {
    product: 
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    },
    service:{
      type: mongoose.Schema.ObjectId,
      ref: 'Service'
    },
    rental:{
      type: mongoose.Schema.ObjectId,
      ref: 'Rental'
    },
    contentType: {
      type: String,
      enum: CATEGORY_TYPE_ENUM,
      default: CATEGORY_TYPE.PRODUCT
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
