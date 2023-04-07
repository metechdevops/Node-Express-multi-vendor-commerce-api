// NPM Packages
import mongoose from 'mongoose';
import slugify from 'slugify';

// Constant
import {
  DURATION_TYPE,
  DURATION_TYPE_ENUM
} from '../constants/constants';

const rentalImage = require("./schema/common/product.image.schema")
const customAttributes = require("./schema/common/product.attributes.schema")

// Plugins
import toJSON from './plugins/index';

// Schema Defination
const rentalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A rental must have a name'],
      trim: true
    },
    slug: String,
    mainImage: rentalImage,
    images: [rentalImage],
    description: {
      type: String,
      required: [true, 'A rental must have a description']
    },
    shortDescription: {
      type: String,
      required: false
    },
    tags:[String],
    attributes: [customAttributes],
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category'
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: 'Category'
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    price: {
      type: Number,
      required: false,
      default: 0
    },
    durationType : {
      type: String,
      enum: DURATION_TYPE_ENUM,
      default: DURATION_TYPE.HOUR
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// add plugin that converts mongoose to json
rentalSchema.plugin(toJSON);

rentalSchema.index(
  { name: 1, category: 1, price: 1, ratingsAverage: -1 },
  { unique: true }
);
rentalSchema.index({ slug: 1 });

// Virtual populate
rentalSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'rental',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create() !.update()
rentalSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Rental = mongoose.model('Rental', rentalSchema);

export default Rental;
