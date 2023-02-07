import mongoose from 'mongoose';
import toJSON from './plugins/index';
const productImage = require("./schema/common/product.image.schema")

const cartSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: [
        /[\w]+?@[\w]+?\.[a-z]{2,4}/,
        'The value of path {PATH} ({VALUE}) is not a valid email address.'
      ]
    },
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        productInfo:{
          seller: {
            id: {
              type: String
            },
            name : {
              type: String
            } 
          },
          mainImage: productImage,
          name:{
            type: String
          },
          price: {
            type: Number,
            required: false,
            default: 0
          },
          slug:{
            type: String
          }
        },
        selectedColor: {
          type: mongoose.Types.ObjectId,
          // ref: 'Color',
          required: false
        },
        selectedSize: {
          type: mongoose.Types.ObjectId,
          // ref: 'Size',
          required: false
        },
        totalProductQuantity: {
          type: Number,
          required: true
        },
        totalProductPrice: {
          type: Number,
          required: true
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    totalQuantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
cartSchema.plugin(toJSON);

cartSchema.pre('save', function (next) {
  this.populate([
    {
      path: 'items.selectedColor',
      select: 'color'
    },
    {
      path: 'items.selectedSize',
      select: 'size'
    }
  ]);

  next();
});

cartSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'items.selectedColor',
      select: 'color'
    },
    {
      path: 'items.selectedSize',
      select: 'size'
    }
  ]);

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
