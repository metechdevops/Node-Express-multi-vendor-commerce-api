// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { review2Service } from '../services/index';

/**
 * @desc      Create New Review Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.serviceId - Product ID
 * @property  { String } req.user.id - User ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the review
 */
export const addServiceReview = catchAsync(async (req, res) => {
  // 1) Create new review
  const { type, message, statusCode, review } =
    await review2Service.createServiceReview(
      req.params.serviceId,
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
export const getAllServiceReviews = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 1) Get all reviews
  const { type, message, statusCode, reviews } =
    await review2Service.queryServiceReviews(req);

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
 * @property  { String } req.params.serviceId - Product ID
 * @property  { String } req.params.reviewId - Review ID
 * @return    { JSON } - A JSON object representing the type, message and the review
 */
export const getServiceReview = catchAsync(async (req, res) => {
  const { serviceId, reviewId } = req.params;

  // 1) Get review using it's ID
  const { type, message, statusCode, review } =
    await review2Service.queryServiceReviewById(serviceId, reviewId);

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
 * @property  { String } req.params.serviceId - Product ID
 * @property  { String } req.params.reviewId - Review ID
 * @property  { Object } req.body - Body object data
 * @return    { JSON } - A JSON object representing the type, message and the review
 */
export const updateServiceReview = catchAsync(async (req, res) => {
  const { serviceId, reviewId } = req.params;

  // 1) Update review using it's ID
  const { type, message, statusCode, review } =
    await review2Service.updateServiceReview(
      req.user.id,
      serviceId,
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
 * @property  { String } req.params.serviceId - Product ID
 * @property  { String } req.params.reviewId - Review ID
 * @property  { String } req.user.id - User ID
 * @return    { JSON } - A JSON object representing the type and message
 */
export const deleteServiceReview = catchAsync(async (req, res) => {
  const { serviceId, reviewId } = req.params;

  // 1) Delete review using it's ID
  const { type, message, statusCode } = await review2Service.deleteServiceReview(
    serviceId,
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
