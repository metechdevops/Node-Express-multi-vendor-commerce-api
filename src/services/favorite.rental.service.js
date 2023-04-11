const mongoose = require('mongoose');

// Utils
import catchAsync from '../utils/catchAsync';

// Models
import { rentalFavorite, Rental } from '../models';

/**
 * @desc    Add rental to favorite list rental
 * @param   { String } userId - User ID
 * @param   { String } rentalId - Rental ID
 * @returns { Object<type|statusCode|message> }
 */
export const addFavoriteRental = catchAsync(async (userId, rentalId) => {
  const rental = await Rental.findById(rentalId);

  // 1) Check if rental doesn't exist
  if (!rental) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noRentalFound'
    };
  }

  // 2) Get favorite data from database
  let favorite = await rentalFavorite.findOne({ user: userId });

  const favoriteData = {
    rentalId:mongoose.Types.ObjectId(rentalId),
    rentalInfo: {
      seller:rental.seller,
      slug:rental.slug,
      name:rental.name,
      mainImage:rental.mainImage.toObject()
    }
  }


  // 3) Check if favorite document exists
  if (favorite) {
    
    // Check if rental already exist in favorite list
    const checkRental = favorite.rentals.find((item)=> {
      return item.rentalId == rentalId;
    })
    if (checkRental) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'rentalExist'
      };
    }

    // Push the rentalId into the new favorite rentals array
    favorite.rentals.push(favoriteData);

    await favorite.save();

    // If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfulFavoriteAdd'
    };
  }

  // 4) Create favorite data
  await rentalFavorite.create({
    rentals: [favoriteData],
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
 * @desc    Get rental's favorite list rental
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode|favorite> }
 */
export const getFavoriteRentalsList = catchAsync(async (userId) => {
  const favorite = await rentalFavorite.findOne({ user: userId });

  // 1) Check if favorite document doesn't exists
  if (!favorite) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noFavoriteListFound'
    };
  }

  // 2) Check if favorite rentals already exist
  if (favorite.length === 0) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noRentalsInFavorite'
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
 * @desc    Remove rental from favorite list rental
 * @param   { String } rentalId - Rental ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteRentalFromFavorite = catchAsync(
  async (userId, rentalId) => {
    const favorite = await rentalFavorite.findOne({ user: userId });

    // 1) Check if favorite document doesn't exists
    if (!favorite) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'noFavoriteListFound'
      };
    }

    // 2) Check if favorite list includes the rentalId
    const checkRental = favorite.rentals.find((favoriteRental) => {
      return favoriteRental.rentalId == rentalId;
    })

    if (checkRental) {

      favorite.rentals = favorite.rentals.filter(
        (item) => item.rentalId !== rentalId
      );

    } else {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'notFoundInFavoriteRentalsList'
      };
    }

    await favorite.save();

    // 3) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfulDeleteRentalFromFavorite'
    };
  }
);

/**
 * @desc    Check if rental in favorite list rental
 * @param   { String } rentalId - Rental ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> }
 */
export const checkRentalInFavoriteList = catchAsync(
  async (userId, rentalId) => {
    const favorite = await rentalFavorite.findOne({ user: userId });

    // 1) Check if favorite document doesn't exists
    if (!favorite) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'noFavoriteListFound'
      };
    }

    // 2) Check if favorite list includes the rentalId
    const checkRental = favorite.rentals.find((favoriteRental) => {
      return favoriteRental.rentalId == rentalId;
    })

    if (!checkRental) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'notFoundInFavoriteRentalsList'
      };
    }

    // 3) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: '200',
      message: 'successfulRentalFoundInFavorite'
    };
  }
);
