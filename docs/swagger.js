import {
  signUp,
  sellerSignUp,
  driverSignUp,
  signIn,
  logout,
  generateTokens,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  sendVerificationEmail,
  updateCustomerProfile,
  updateSellerProfile,
  updateDriverProfile,
  getCustomerProfile,
  getDriverProfile,
  getSellerProfile

} from './auth.swagger';

import {
  uploadMediaImages,
} from './media.swagger';

import {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategoryDetails,
  deleteCategory
} from './category.swagger';

import {
  getAllStores,
  getStore,
  addStore,
  updateStoreDetails,
  deleteStore
} from './store.swagger';

import {
  getAllAddress,
  getAddress,
  addAddress,
  updateAddressDetails,
  deleteAddress
} from './address.swagger';

import {
  getAllLookupData,
  completeAuthPayment
} from './lookup.data.swagger';

import {
  getAllProducts,
  getProduct,
  addProduct,
  top5Cheap,
  productStats,
  updateProductDetails,
  deleteProduct,
  addProductColor,
  addProductSize,
  deleteProductColor,
  deleteProductSize
} from './product.swagger';

import {
  getAllServices,
  getService,
  addService,
  top5CheapServices,
  serviceStats,
  updateServiceDetails,
  deleteService
} from './service.swagger';

import {
  getAllRentals,
  getRental,
  addRental,
  top5CheapRentals,
  rentalStats,
  updateRentalDetails,
  deleteRental
} from './rental.swagger';

import {
  getCart,
  addItemsToCart,
  increaseProductQuantityByOne,
  reduceProductQuantityByOne,
  deleteProductFromCart,
  deleteCart
} from './cart.swagger';

import {
  getAllProductReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} from './review.swagger';

import {
  getAllServiceReviews,
  getServiceReview,
  addServiceReview,
  updateServiceReview,
  deleteServiceReview
} from './service.review.swagger';

import {
  getAllRentalReviews,
  getRentalReview,
  addRentalReview,
  updateRentalReview,
  deleteRentalReview
} from './rental.review.swagger';


import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  deleteMyAccount
} from './user.swagger';

import {
  createNewOrder,
  getAllOrders,
  getOrder,
  orderStatus,
  cancelOrder
} from './order.swagger';

import {
  addFavoriteProduct,
  deleteProductFromFavorite,
  checkProductInFavoriteList,
  getFavoriteList
} from './favorite.swagger';

import {
  verifyDiscountCode,
  getDiscount,
  getAllDiscountCodes,
  generateDiscountCode,
  deleteDiscountCode,
  cancelDiscountCode
} from './discount.swagger';

const docs = {
  openapi: '3.0.3',
  info: {
    title: 'Ecommerce API',
    description: 'An API for ecommerce works built using NodeJS & MongoDB',
    version: '1.0.0',
    contact: {
      name: 'Muhammad Nadeem',
      email: 'metechdevops@gmail.com',
      url: 'https://github.com/metechdevops'
    }
  },
  servers: [
    {
      url: 'http://localhost:8000/api',
      description: 'Local Server'
    },
    {
      url: 'https://ecart.codexnova.com/api',
      description: 'Development Server API'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      jwt: ['secret']
    },
  ],
  paths: {
    '/auth/login': {
      post: signIn
    },
    '/auth/register': {
      post: signUp
    },
    '/auth/seller/register': {
      post: sellerSignUp
    },
    '/auth/driver/register': {
      post: driverSignUp
    },
    '/auth/logout': {
      post: logout
    },
    '/auth/tokens': {
      post: generateTokens
    },
    '/auth/forgot-password': {
      post: forgotPassword
    },
    '/auth/reset-password': {
      post: resetPassword
    },
    '/auth/change-password': {
      patch: changePassword
    },
    '/auth/verify-email': {
      post: verifyEmail
    },
    '/auth/send-verification-email': {
      post: sendVerificationEmail
    },
    '/auth/customer/update-profile': {
      post: updateCustomerProfile
    },
    '/auth/seller/update-profile': {
      post: updateSellerProfile
    },
    '/auth/driver/update-profile': {
      post: updateDriverProfile
    },
    '/auth/customer/profile': {
      get: getCustomerProfile
    },
    '/auth/seller/profile': {
      get: getSellerProfile
    },
    '/auth/driver/profile': {
      get: getDriverProfile
    },
    '/media/profile/web': {
      post: uploadMediaImages
    },
    '/user': {
      get: getAllUsers,
      post: addUser
    },
    '/user/{id}': {
      get: getUser,
      delete: deleteUser
    },
    // '/user/update-details': {
    //   patch: updateUserDetails
    // },
    // '/user/update-profile-image': {
    //   patch: updateUserProfileImage
    // },
    // '/user/me': {
    //   delete: deleteMyAccount
    // },
    '/lookup-data': {
      get: getAllLookupData
    },
    '/lookup-data/process-payment': {
      post: completeAuthPayment
    },
    '/category': {
      get: getAllCategories,
      post: addCategory
    },
    '/category/{categoryId}': {
      get: getCategory,
      patch: updateCategoryDetails,
      delete: deleteCategory
    },
    '/store': {
      get: getAllStores,
      post: addStore
    },
    '/store/{storeId}': {
      get: getStore,
      patch: updateStoreDetails,
      delete: deleteStore
    },
    '/address': {
      get: getAllAddress,
      post: addAddress
    },
    '/address/{addressId}': {
      get: getAddress,
      patch: updateAddressDetails,
      delete: deleteAddress
    },

    // Services Routes
    '/service': {
      get: getAllServices,
      post: addService
    },
    '/service/{serviceId}': {
      get: getService,
      delete: deleteService
    },
    '/service/top-5-cheap': {
      get: top5CheapServices
    },
    '/service/service-stats': {
      get: serviceStats
    },
    '/service/{serviceId}/details': {
      patch: updateServiceDetails
    },

    // Rental Routes
    '/rental': {
      get: getAllRentals,
      post: addRental
    },
    '/rental/{rentalId}': {
      get: getRental,
      delete: deleteRental
    },
    '/rental/top-5-cheap': {
      get: top5CheapRentals
    },
    '/rental/rental-stats': {
      get: rentalStats
    },
    '/rental/{rentalId}/details': {
      patch: updateRentalDetails
    },

    // Products Routes
    '/product': {
      get: getAllProducts,
      post: addProduct
    },
    '/product/{productId}': {
      get: getProduct,
      delete: deleteProduct
    },
    '/product/top-5-cheap': {
      get: top5Cheap
    },
    '/product/product-stats': {
      get: productStats
    },
    '/product/{productId}/details': {
      patch: updateProductDetails
    },
    '/product/color/{productId}': {
      post: addProductColor,
      delete: deleteProductColor
    },
    '/product/size/{productId}': {
      post: addProductSize,
      delete: deleteProductSize
    },
    '/favorite': {
      get: getFavoriteList,
      post: addFavoriteProduct
    },
    '/favorite/{productId}': {
      delete: deleteProductFromFavorite
    },
    '/favorite/check/{productId}': {
      get: checkProductInFavoriteList
    },
    '/discount': {
      get: getAllDiscountCodes
    },
    '/discount/verify': {
      post: verifyDiscountCode
    },
    '/discount/cancel': {
      delete: cancelDiscountCode
    },
    '/discount/find': {
      get: getDiscount
    },
    '/discount/generate': {
      post: generateDiscountCode
    },
    '/discount/{discountId}': {
      delete: deleteDiscountCode
    },
    '/cart': {
      get: getCart,
      post: addItemsToCart,
      delete: deleteCart
    },
    '/cart/increase-one': {
      patch: increaseProductQuantityByOne
    },
    '/cart/reduce-one': {
      patch: reduceProductQuantityByOne
    },
    '/cart/{productId}': {
      delete: deleteProductFromCart
    },
    '/order': {
      get: getAllOrders,
      post: createNewOrder
    },
    '/order/{id}': {
      get: getOrder,
      patch: orderStatus,
      delete: cancelOrder
    },

    // Product Reviews
    '/product/{productId}/reviews': {
      get: getAllProductReviews,
      post: addReview
    },
    '/product/{productId}/reviews/{reviewId}': {
      get: getReview,
      patch: updateReview,
      delete: deleteReview
    },

    // Service Reviews
    '/service/{serviceId}/reviews': {
      get: getAllServiceReviews,
      post: addServiceReview
    },
    '/service/{serviceId}/reviews/{reviewId}': {
      get: getServiceReview,
      patch: updateServiceReview,
      delete: deleteServiceReview
    },

    // Service Reviews
    '/rental/{rentalId}/reviews': {
      get: getAllRentalReviews,
      post: addRentalReview
    },
    '/rental/{rentalId}/reviews/{reviewId}': {
      get: getRentalReview,
      patch: updateRentalReview,
      delete: deleteRentalReview
    }

  }
};

export default docs;
