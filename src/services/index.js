import {
  signin,
  sellerSignup,
  driverSignup,
  customerSignup,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  changePassword,
  updateCustomerProfile,
  updateSellerProfile,
  updateDriverProfile,
  getProfile
} from './auth.service';

import {
  createReview,
  queryReviews,
  queryReviewById,
  updateReview,
  deleteReview
} from './review.service';

import {
  createServiceReview,
  queryServiceReviews,
  queryServiceReviewById,
  updateServiceReview,
  deleteServiceReview
} from './review2.service';

import {
  createRentalReview,
  queryRentalReviews,
  queryRentalReviewById,
  updateRentalReview,
  deleteRentalReview
} from './rental.review.service';

import {
  createUser,
  queryUsers,
  queryUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser,
  deleteMyAccount
} from './user.service';

// import {
//   updateUserDetails,
//   updateUserProfileImage,

// } from './seller.service';

import {
  createCategory,
  queryCategories,
  queryCategory,
  updateCategoryDetails,
  updateCategoryImage,
  deleteCategoryById
} from './category.service';

import {
  createStore,
  queryStores,
  queryStore,
  updateStoreDetails,
  updateStoreImage,
  deleteStoreById
} from './store.service';

import {
  createAddress,
  queryAllAddress,
  getAddress,
  updateAddressDetails,
  updateAddressImage,
  deleteAddressById
} from './address.service';

import {
  queryLookupData
} from './lookup.data.service';

import {
  queryProducts,
  queryProductById,
  createProduct,
  updateProductDetails,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize,
  updateProductMainImage,
  updateProductImages,
  deleteProduct,
  getProductStats
} from './product.service';

import {
  queryServices,
  queryServiceById,
  createService,
  updateServiceDetails,
  deleteService,
  getServiceStats
} from './custom.service';

import {
  queryRentals,
  queryRentalById,
  createRental,
  updateRentalDetails,
  deleteRental,
  getRentalStats
} from './rental.service';


import {
  addProductToCart,
  reduceByOne,
  increaseByOne,
  queryCart,
  deleteCart,
  deleteItem
} from './cart.service';

import {
  createOrder,
  orderStatus,
  queryOrders,
  queryOrder,
  cancelOrder
} from './order.service';

import {
  getAllDiscountCodes,
  getDiscount,
  verifyDiscountCode,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
} from './discount.service';

import {
  addFavoriteProduct,
  getFavoriteList,
  deleteProductFromFavorite,
  checkProductInFavoriteList
} from './favorite.service';

import {
  addFavoriteService,
  getFavoriteServicesList,
  deleteServiceFromFavorite,
  checkServiceInFavoriteList
} from './favorite.custom.service';

import {
  createMedia,
  createDocumentMedia
} from './media.service';

const authService = {
  signin,
  sellerSignup,
  driverSignup,
  customerSignup,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  changePassword,
  updateCustomerProfile,
  updateSellerProfile,
  updateDriverProfile,
  getProfile
};

const reviewService = {
  createReview,
  queryReviews,
  queryReviewById,
  updateReview,
  deleteReview
};

const review2Service = {
  createServiceReview,
  queryServiceReviews,
  queryServiceReviewById,
  updateServiceReview,
  deleteServiceReview
};

const rentalReview = {
  createRentalReview,
  queryRentalReviews,
  queryRentalReviewById,
  updateRentalReview,
  deleteRentalReview
};

const mediaService = {
  createMedia,
  createDocumentMedia
};

const userService = {
  createUser,
  queryUsers,
  queryUser,
  updateUserDetails,
  updateUserProfileImage,
  deleteUser,
  deleteMyAccount
};

// const sellerService = {
//   updateUserDetails,
//   updateUserProfileImage
// };

const categoryService = {
  createCategory,
  queryCategories,
  queryCategory,
  updateCategoryDetails,
  updateCategoryImage,
  deleteCategoryById
};

const storeService = {
  createStore,
  queryStores,
  queryStore,
  updateStoreDetails,
  updateStoreImage,
  deleteStoreById
};

const addressService = {
  createAddress,
  queryAllAddress,
  getAddress,
  updateAddressDetails,
  updateAddressImage,
  deleteAddressById
};

const lookupDataService = {
  queryLookupData
};

// const storeService = {
//   createStore,
//   queryCategories,
//   queryStore,
//   updateStoreDetails,
//   updateStoreImage,
//   deleteStoreById
// };

const productService = {
  queryProducts,
  queryProductById,
  createProduct,
  updateProductDetails,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize,
  updateProductMainImage,
  updateProductImages,
  deleteProduct,
  getProductStats
};

const customService = {
  queryServices,
  queryServiceById,
  createService,
  updateServiceDetails,
  deleteService,
  getServiceStats
};

const rentalService = {
  queryRentals,
  queryRentalById,
  createRental,
  updateRentalDetails,
  deleteRental,
  getRentalStats
};

const cartService = {
  addProductToCart,
  reduceByOne,
  increaseByOne,
  queryCart,
  deleteCart,
  deleteItem
};

const orderService = {
  createOrder,
  orderStatus,
  queryOrders,
  queryOrder,
  cancelOrder
};

const discountService = {
  getAllDiscountCodes,
  getDiscount,
  verifyDiscountCode,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
};

const favoriteService = {
  addFavoriteProduct,
  getFavoriteList,
  deleteProductFromFavorite,
  checkProductInFavoriteList
};

const favoriteCustomService = {
  addFavoriteService,
  getFavoriteServicesList,
  deleteServiceFromFavorite,
  checkServiceInFavoriteList
};

export {
  authService,
  userService,
  categoryService,
  storeService,
  addressService,
  lookupDataService,
  productService,
  customService,
  rentalService,
  reviewService,
  review2Service,
  rentalReview,
  cartService,
  orderService,
  discountService,
  favoriteService,
  favoriteCustomService,
  mediaService
};
