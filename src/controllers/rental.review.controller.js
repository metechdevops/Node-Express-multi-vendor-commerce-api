// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { rentalReview } from '../services/index';

/**
 * @desc      Create New Review Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.rentalId - Product ID
 * @property  { String } req.user.id - User ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the review
 */
export const addRentalReview = catchAsync(async (req, res) => {
  // 1) Create new review
  const { type, message, statusCode, review } =
    await rentalReview.createRentalReview(
      req.params.rentalId,
      req.user.id,
      req.body
    );

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    review
  });
});

/**
 * @desc      Get All Reviews Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - Maximum number of reviews on page
 * @return    { JSON } - A JSON object representing the type, message and the reviews
 */
export const getAllRentalReviews = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 1) Get all reviews
  const { type, message, statusCode, reviews } =
    await rentalReview.queryRentalReviews(req);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    reviews
  });
});

/**
 * @desc      Get Review Using It's ID Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.rentalId - Product ID
 * @property  { String } req.params.reviewId - Review ID
 * @return    { JSON } - A JSON object representing the type, message and the review
 */
export const getRentalReview = catchAsync(async (req, res) => {
  const { rentalId, reviewId } = req.params;

  // 1) Get review using it's ID
  const { type, message, statusCode, review } =
    await rentalReview.queryRentalReviewById(rentalId, reviewId);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    review
  });
});

/**
 * @desc      Update Review Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.user.id - User ID
 * @property  { String } req.params.rentalId - Product ID
 * @property  { String } req.params.reviewId - Review ID
 * @property  { Object } req.body - Body object data
 * @return    { JSON } - A JSON object representing the type, message and the review
 */
export const updateRentalReview = catchAsync(async (req, res) => {
  const { rentalId, reviewId } = req.params;

  // 1) Update review using it's ID
  const { type, message, statusCode, review } =
    await rentalReview.updateRentalReview(
      req.user.id,
      rentalId,
      reviewId,
      req.body
    );

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    review
  });
});

/**
 * @desc    Delete Review Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.rentalId - Product ID
 * @property  { String } req.params.reviewId - Review ID
 * @property  { String } req.user.id - User ID
 * @return    { JSON } - A JSON object representing the type and message
 */
export const deleteRentalReview = catchAsync(async (req, res) => {
  const { rentalId, reviewId } = req.params;

  // 1) Delete review using it's ID
  const { type, message, statusCode } = await rentalReview.deleteRentalReview(
    rentalId,
    reviewId,
    req.user.id
  );

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message)
  });
});
