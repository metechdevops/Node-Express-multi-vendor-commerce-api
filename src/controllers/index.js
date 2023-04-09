import {
  signin,
  sellerSignup,
  driverSignup,
  customerSignup,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  changePassword,
  getSellerProfile,
  getDriverProfile,
  updateCustomerProfile,
  updateSellerProfile,
  updateDriverProfile
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
  getAllServices,
  getService,
  addService,
  updateServiceDetails,
  deleteService,
  top5CheapServices,
  serviceStats
} from './service.controller';

import {
  getAllRentals,
  getRental,
  addRental,
  updateRentalDetails,
  deleteRental,
  top5CheapRentals,
  rentalStats
} from './rental.controller';

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
  getAllLookupData,
  checkoutPayment,
  processAuthPayment
} from './lookup.data.controller';

import {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} from './review.controller';

import {
  getAllServiceReviews,
  getServiceReview,
  addServiceReview,
  updateServiceReview,
  deleteServiceReview
} from './service.review.controller';

import {
  getAllRentalReviews,
  getRentalReview,
  addRentalReview,
  updateRentalReview,
  deleteRentalReview
} from './rental.review.controller';

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
  addFavoriteService,
  getFavoriteServicesList,
  deleteServiceFromFavorite,
  checkServiceInFavoriteList
} from './favorite.service.controller';

import {
  createMedia,
  createDocumentMedia
} from './media.controller';

const authController = {
  signin,
  sellerSignup,
  driverSignup,
  customerSignup,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  changePassword,
  getSellerProfile,
  getDriverProfile,
  updateCustomerProfile,
  updateSellerProfile,
  updateDriverProfile
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
  getAllLookupData,
  checkoutPayment,
  processAuthPayment
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

const serviceController = {
  getAllServices,
  getService,
  addService,
  updateServiceDetails,
  deleteService,
  top5CheapServices,
  serviceStats
};

const rentalController = {
  getAllRentals,
  getRental,
  addRental,
  updateRentalDetails,
  deleteRental,
  top5CheapRentals,
  rentalStats
};

const reviewController = {
  getAllReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
};

const serviceReviewController = {
  getAllServiceReviews,
  getServiceReview,
  addServiceReview,
  updateServiceReview,
  deleteServiceReview
};

const rentalReviewController = {
  getAllRentalReviews,
  getRentalReview,
  addRentalReview,
  updateRentalReview,
  deleteRentalReview
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

const favoriteServiceController = {
  addFavoriteService,
  getFavoriteServicesList,
  deleteServiceFromFavorite,
  checkServiceInFavoriteList
};

const mediaController = {
  createMedia,
  createDocumentMedia
};

export {
  authController,
  userController,
  productController,
  serviceController,
  rentalController,
  categoryController,
  storeController,
  addressController,
  lookupDataController,
  reviewController,
  serviceReviewController,
  rentalReviewController,
  cartController,
  orderController,
  discountController,
  favoriteController,
  favoriteServiceController,
  mediaController
};
