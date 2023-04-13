const mongoose = require('mongoose');

// Utils
import catchAsync from '../utils/catchAsync';

// Models
import { 
  Favorite, 
  rentalFavorite, 
  serviceFavorite, 
  Product } from '../models';

/**
 * @desc    Add product to favorite list service
 * @param   { String } userId - User ID
 * @param   { String } productId - Product ID
 * @returns { Object<type|statusCode|message> }
 */
export const addFavoriteProduct = catchAsync(async (userId, productId) => {
  const product = await Product.findById(productId);

  // 1) Check if product doesn't exist
  if (!product) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noProductFound'
    };
  }

  // 2) Get favorite data from database
  let favorite = await Favorite.findOne({ user: userId });

  const favoriteData = {
    productId:mongoose.Types.ObjectId(productId),
    productInfo: {
      seller:product.seller.toObject(),
      slug:product.slug,
      name:product.name,
      mainImage:product.mainImage.toObject()
    }
  }


  // 3) Check if favorite document exists
  if (favorite) {
    
    // Check if product already exist in favorite list
    const checkProduct = favorite.products.find((item)=> {
      return item.productId.toString() == productId;
    })
    if (checkProduct) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'productExist'
      };
    }

    // Push the productId into the new favorite products array
    favorite.products.push(favoriteData);

    await favorite.save();

    // If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfulFavoriteAdd'
    };
  }

  // 4) Create favorite data
  await Favorite.create({
    products: [favoriteData],
    user: userId
  });

  // 5) If everything is OK, send data
  return {
    type: 'Success',
    statusCode: 200,
    message: 'successfulFavoriteAdd'
  };
});

/**
 * @desc    Get product's favorite list service
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode|favorite> }
 */
export const getFavoriteList = catchAsync(async (userId) => {

  const favorite = await Favorite.findOne({ user: userId });
  const service = await serviceFavorite.findOne({ user: userId });
  const rental = await rentalFavorite.findOne({ user: userId });

  // 1) Check if favorite document doesn't exists
  // if (!favorite) {
  //   return {
  //     type: 'Error',
  //     statusCode: 404,
  //     message: 'noFavoriteListFound'
  //   };
  // }

  // 2) Check if favorite products already exist
  // if (favorite.length === 0) {
  //   return {
  //     type: 'Error',
  //     statusCode: 404,
  //     message: 'noProductsInFavorite'
  //   };
  // }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    statusCode: 200,
    message: 'successfulFavoriteGet',
    favorite,
    service,
    rental
  };
});

/**
 * @desc    Remove product from favorite list service
 * @param   { String } productId - Product ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteProductFromFavorite = catchAsync(
  async (userId, productId) => {
    const favorite = await Favorite.findOne({ user: userId });

    // 1) Check if favorite document doesn't exists
    if (!favorite) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'noFavoriteListFound'
      };
    }

    // 2) Check if favorite list includes the productId
    const checkProduct = favorite.products.find((favoriteProduct) => {
      return favoriteProduct.productId.toString() == productId;
    })

    if (checkProduct) {

      favorite.products = favorite.products.filter(
        (item) => item.productId.toString() !== productId.toString()
      );

    } else {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'notFoundInFavoriteList'
      };
    }

    await favorite.save();

    // 3) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfulDeleteProductFromFavorite'
    };
  }
);

/**
 * @desc    Check if product in favorite list service
 * @param   { String } productId - Product ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> }
 */
export const checkProductInFavoriteList = catchAsync(
  async (userId, productId) => {
    const favorite = await Favorite.findOne({ user: userId });

    // 1) Check if favorite document doesn't exists
    if (!favorite) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'noFavoriteListFound'
      };
    }

    // 2) Check if favorite list includes the productId
    const checkProduct = favorite.products.find((favoriteProduct) => {
      return favoriteProduct.productId.toString() == productId;
    })

    if (!checkProduct) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'notFoundInFavoriteList'
      };
    }

    // 3) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: '200',
      message: 'successfulProductFoundInFavorite'
    };
  }
);
