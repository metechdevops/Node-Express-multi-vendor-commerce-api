// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/index';
const productImage = require("./schema/common/product.image.schema")

const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        productId:{
          type: mongoose.Types.ObjectId,
          // type: String,
          ref: 'Product',
          required: false,
          trim: true
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
          slug:{
            type: String
          }
        },
      }
    ]
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
favoriteSchema.plugin(toJSON);

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
