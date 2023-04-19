// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { serviceBooking } from '../services/index';

/**
 * @desc      Create New ServiceBooking Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body object data
 * @property  { Object } req.user - An object contains logged in user data
 * @return    { JSON } - A JSON object representing the type, message and the booking
 */
export const createServiceBooking = catchAsync(async (req, res) => {
  // 1) Create new booking
  const { type, message, statusCode, booking,paymentResponse } = await serviceBooking.createServiceBooking(
    req.body,
    req.user
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
    booking,
    paymentResponse
  });
});

/**
 * @desc      Update booking status Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.body.status - ServiceBooking status
 * @property  { String } req.params.id - ServiceBooking ID
 * @return    { JSON } - A JSON object representing the type, message and the booking
 */
export const serviceBookingStatus = catchAsync(async (req, res) => {
  // 1) Update booking status
  const { type, message, statusCode } = await serviceBooking.serviceBookingStatus(
    req.body.status,
    req.params.id
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

/**
 * @desc      Get All ServiceBookings Controller
 * @param     { Object }  req - Request object
 * @param     { Object }  res - Response object
 * @property  { String }  req.query.sort - Sort returned data
 * @property  { String }  req.query.select - Select specific fields
 * @property  { Number }  req.query.page - Page number
 * @property  { Number }  req.query.limit - Limit number of items
 * @return    { JSON } - A JSON object representing the type, message and the bookings
 */
export const getAllServiceBookings = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 1) Get all bookings
  const { type, message, statusCode, bookings } = await serviceBooking.queryServiceBookings(
    req
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
    bookings
  });
});

/**
 * @desc      Get ServiceBooking Using It's ID Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - ServiceBooking ID
 * @return    { JSON } - A JSON object representing the type, message and the booking
 */
export const getServiceBooking = catchAsync(async (req, res) => {
  // 1) Get booking using it's ID
  const { type, message, statusCode, booking } = await serviceBooking.queryServiceBooking(
    req.params.id
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
    booking
  });
});

/**
 * @desc      Cancel ServiceBooking Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - ServiceBooking ID
 * @return    { JSON } - A JSON object representing the type and message
 */
export const cancelServiceBooking = catchAsync(async (req, res) => {
  // 1) Cancel booking using it's ID
  const { type, message, statusCode } = await serviceBooking.cancelServiceBooking(
    req.params.id
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
