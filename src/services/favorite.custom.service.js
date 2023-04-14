const mongoose = require('mongoose');

// Utils
import catchAsync from '../utils/catchAsync';

// Models
import { serviceFavorite, Service } from '../models';

/**
 * @desc    Add service to favorite list service
 * @param   { String } userId - User ID
 * @param   { String } serviceId - Service ID
 * @returns { Object<type|statusCode|message> }
 */
export const addFavoriteService = catchAsync(async (userId, serviceId) => {
  const service = await Service.findById(serviceId);

  // 1) Check if service doesn't exist
  if (!service) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noServiceFound'
    };
  }

  // 2) Get favorite data from database
  let favorite = await serviceFavorite.findOne({ user: userId });

  const favoriteData = {
    serviceId:mongoose.Types.ObjectId(serviceId),
    serviceInfo: {
      seller:service.seller,
      slug:service.slug,
      name:service.name,
      mainImage:service.mainImage.toObject()
    }
  }


  // 3) Check if favorite document exists
  if (favorite) {
    
    // Check if service already exist in favorite list
    const checkService = favorite.services.find((item)=> {
      return item.serviceId == serviceId;
    })
    if (checkService) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'serviceExist'
      };
    }

    // Push the serviceId into the new favorite services array
    favorite.services.push(favoriteData);

    await favorite.save();

    // If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfulFavoriteServiceAdd'
    };
  }

  // 4) Create favorite data
  await serviceFavorite.create({
    services: [favoriteData],
    user: userId
  });

  // 5) If everything is OK, send data
  return {
    type: 'Success',
    statusCode: 200,
    message: 'successfulFavoriteServiceAdd'
  };
});

/**
 * @desc    Get service's favorite list service
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode|favorite> }
 */
export const getFavoriteServicesList = catchAsync(async (userId) => {
  const favorite = await serviceFavorite.findOne({ user: userId });

  // 1) Check if favorite document doesn't exists
  if (!favorite) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noFavoriteListFound'
    };
  }

  // 2) Check if favorite services already exist
  if (favorite.length === 0) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noServicesInFavorite'
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    statusCode: 200,
    message: 'successfulFavoriteGet',
    favorite
  };
});

/**
 * @desc    Remove service from favorite list service
 * @param   { String } serviceId - Service ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteServiceFromFavorite = catchAsync(
  async (userId, serviceId) => {
    const favorite = await serviceFavorite.findOne({ user: userId });

    // 1) Check if favorite document doesn't exists
    if (!favorite) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'noFavoriteListFound'
      };
    }

    // 2) Check if favorite list includes the serviceId
    const checkService = favorite.services.find((favoriteService) => {
      return favoriteService.serviceId == serviceId;
    })

    if (checkService) {

      favorite.services = favorite.services.filter(
        (item) => item.serviceId !== serviceId
      );

    } else {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'notFoundInFavoriteServicesList'
      };
    }

    await favorite.save();

    // 3) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfulDeleteServiceFromFavorite'
    };
  }
);

/**
 * @desc    Check if service in favorite list service
 * @param   { String } serviceId - Service ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> }
 */
export const checkServiceInFavoriteList = catchAsync(
  async (userId, serviceId) => {
    const favorite = await serviceFavorite.findOne({ user: userId });

    // 1) Check if favorite document doesn't exists
    if (!favorite) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'noFavoriteListFound'
      };
    }

    // 2) Check if favorite list includes the serviceId
    const checkService = favorite.services.find((favoriteService) => {
      return favoriteService.serviceId == serviceId;
    })

    if (!checkService) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'notFoundInFavoriteServicesList'
      };
    }

    // 3) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: '200',
      message: 'successfulServiceFoundInFavorite'
    };
  }
);
