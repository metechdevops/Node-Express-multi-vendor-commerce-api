// Utils
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

// Models
import { Rental,rentalReview } from '../models/index';

/**
 * @desc    Create New rentalReview
 * @param   { Object } body - Body object data
 * @param   { String } rental - Product ID
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|review> }
 */
export const createRentalReview = catchAsync(async (rental, user, body) => {
  const { review, rating } = body;

  // 1) Check if user entered all fields
  if (!review || !rating) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  if (rating < 1) {
    return {
      type: 'Error',
      message: 'ratingLessThanOne',
      statusCode: 400
    };
  }

  const checkUser = await rentalReview.find({ user, rental });

  // 2) Check if the user make a review before on that rental
  if (checkUser.length !== 0) {
    return {
      type: 'Error',
      message: 'onlyOneReview',
      statusCode: 400
    };
  }

  // 3) Create review
  const newReview = await rentalReview.create({
    rental,
    user,
    review,
    rating
  });

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulReviewCreate',
    statusCode: 201,
    newReview
  };
});

/**
 * @desc    Query All Reviews
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|reviews> }
 */
export const queryRentalReviews = catchAsync(async (req) => {
  const rental = await Rental.findById(req.params.rentalId);

  // 1) Check if rental doesn't exist
  if (!rental) {
    return {
      type: 'Error',
      message: 'noProductFound',
      statusCode: 404
    };
  }

  const populateQuery = [
    { path: 'rental', select: 'seller.name' },
    { path: 'user', select: 'profileImage firstName lastName email' }
  ];

  // Filter by rental
  req.query.rental = rental._id.toString();

  let reviews = await APIFeatures(req, rentalReview,populateQuery);

  // 2) Check if reviews doesn't exist
  if (reviews.data.length === 0) {
    return {
      type: 'Error',
      message: 'noReviewsFound',
      statusCode: 404
    };
  }

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulReviewsFound',
    statusCode: 200,
    reviews
  };
});

/**
 * @desc    Query Review Using It's ID
 * @param   { String } rentalId - Product ID
 * @param   { String } reviewId - Review ID
 * @returns { Object<type|message|statusCode|review> }
 */
export const queryRentalReviewById = catchAsync(async (rentalId, reviewId) => {
  const rental = await Rental.findById(rentalId);

  // 1) Check if rental doesn't exist'
  if (!rental) {
    return {
      type: 'Error',
      message: 'noProductFound',
      statusCode: 404
    };
  }

  const review = await rentalReview.findById(reviewId);

  // 2) Check if review doesn't exist
  if (!review) {
    return {
      type: 'Error',
      message: 'noReviewFound',
      statusCode: 404
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulReviewFound',
    statusCode: 200,
    review
  };
});

/**
 * @desc    Update Review Using It's ID
 * @param   { String } userId - userId
 * @param   { String } rentalId - Product ID
 * @param   { String } reviewId - Review ID
 * @param   { Object } body - Body object data
 * @returns { Object<type|message|statusCode|review> }
 */
export const updateRentalReview = catchAsync(
  async (userId, rentalId, reviewId, body) => {
    const rental = await Rental.findById(rentalId);

    // 1) Check if rental doesn't exist
    if (!rental) {
      return {
        type: 'Error',
        message: 'noProductFound',
        statusCode: 404
      };
    }

    const review = await rentalReview.findById(reviewId);

    // 2) Check if review doesn't exist
    if (!review) {
      return {
        type: 'Error',
        message: 'noReviewFound',
        statusCode: 404
      };
    }

    // 3) Check if the one who want to update review is the review creator
    if (userId.toString() !== review.user.toString()) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'notReviewCreator'
      };
    }

    // 3) Check if review rating less than 1
    if (body.rating < 1) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'ratingLessThanOne'
      };
    }

    // 4) Update review
    const result = await rentalReview.findByIdAndUpdate(reviewId, body, {
      new: true,
      runValidators: true
    });

    // 5) If everything is OK, send data
    return {
      type: 'Success',
      message: 'successfulReviewUpdate',
      statusCode: 200,
      result
    };
  }
);

/**
 * @desc    Delete Review Using It's ID
 * @param   { String } rentalId - Product ID
 * @param   { String } reviewId - Review ID
 * @param   { String } userId - User ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteRentalReview = catchAsync(async (rentalId, reviewId, userId) => {
  const rental = await Rental.findById(rentalId);

  // 1) Check if rental doesn't exist
  if (!rental) {
    return {
      type: 'Error',
      message: 'noProductFound',
      statusCode: 404
    };
  }

  const review = await rentalReview.findById(reviewId);

  // 2) Check if review doesn't exist
  if (!review) {
    return {
      type: 'Error',
      message: 'noReviewFound',
      statusCode: 404
    };
  }

  // 3) Check if the user is the creator of the review to delete it
  if (userId.toString() !== review.user.toString()) {
    return {
      type: 'Error',
      statusCode: 400,
      message: 'notReviewCreator'
    };
  }

  // 4) Delete review
  await rentalReview.findByIdAndDelete(reviewId);

  // 5) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulReviewDelete',
    statusCode: 200
  };
});
