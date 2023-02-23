import {
  signin,
  sellerSignup,
  customerSignup,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  changePassword,
  getSellerProfile,
  updateCustomerProfile,
  updateSellerProfile
} from './auth.controller';

import {
  getAllProducts,
  getProduct,
  addProduct,
  updateProductDetails,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize,
  updateProductMainImage,
  updateProductImages,
  deleteProduct,
  top5Cheap,
  productStats
} from './product.controller';

import {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser,
  deleteMyAccount
} from './user.controller';

import {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategoryDetails,
  updateCategoryImage,
  deleteCategory
} from './category.controller';

import {
  getAllStores,
  getStore,
  addStore,
  updateStoreDetails,
  updateStoreImage,
  deleteStore
} from './store.controller';

import {
  getAllAddress,
  getAddress,
  addAddress,
  updateAddressDetails,
  updateAddressImage,
  deleteAddress
} from './address.controller';

import {
  getAllLookupData
} from './lookup.data.controller';

import {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} from './review.controller';

import {
  addItemToCart,
  reduceByOne,
  increaseByOne,
  getCart,
  deleteCart,
  deleteItem
} from './cart.controller';

import {
  createOrder,
  orderStatus,
  getAllOrders,
  getOrder,
  cancelOrder
} from './order.controller';

import {
  getAllDiscountCodes,
  getDiscount,
  verifyDiscountCode,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
} from './discount.controller';

import {
  addFavoriteProduct,
  getFavoriteList,
  deleteProductFromFavorite,
  checkProductInFavoriteList
} from './favorite.controller';

import {
  createMedia,
  createDocumentMedia
} from './media.controller';

const authController = {
  signin,
  sellerSignup,
  customerSignup,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  changePassword,
  getSellerProfile,
  updateCustomerProfile,
  updateSellerProfile
};

const userController = {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser,
  deleteMyAccount
};

const categoryController = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategoryDetails,
  updateCategoryImage,
  deleteCategory
};

const storeController = {
  getAllStores,
  getStore,
  addStore,
  updateStoreDetails,
  updateStoreImage,
  deleteStore
};

const addressController = {
  getAllAddress,
  getAddress,
  addAddress,
  updateAddressDetails,
  updateAddressImage,
  deleteAddress
};

const lookupDataController = {
  getAllLookupData
};



const productController = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProductDetails,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize,
  updateProductMainImage,
  updateProductImages,
  deleteProduct,
  top5Cheap,
  productStats
};

const reviewController = {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
};

const cartController = {
  addItemToCart,
  reduceByOne,
  increaseByOne,
  getCart,
  deleteCart,
  deleteItem
};

const orderController = {
  createOrder,
  orderStatus,
  getAllOrders,
  getOrder,
  cancelOrder
};

const discountController = {
  getAllDiscountCodes,
  getDiscount,
  verifyDiscountCode,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
};

const favoriteController = {
  addFavoriteProduct,
  getFavoriteList,
  deleteProductFromFavorite,
  checkProductInFavoriteList
};

const mediaController = {
  createMedia,
  createDocumentMedia
};

export {
  authController,
  userController,
  productController,
  categoryController,
  storeController,
  addressController,
  lookupDataController,
  reviewController,
  cartController,
  orderController,
  discountController,
  favoriteController,
  mediaController
};
