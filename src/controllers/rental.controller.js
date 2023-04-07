// Utils
import catchAsync from '../utils/catchAsync';

// Rentals
import { rentalService } from '../services/index';

/**
 * @desc      Get All Rental Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - Maximum number of rentals
 * @returns   { JSON } - A JSON object representing the type, message and the rentals
 */
export const getAllRentals = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) req.query.page = 1;
  if (!sort) req.query.sort = '';
  if (!limit) req.query.limit = 10;
  if (!select) req.query.select = '';

  // 1) Get all rentals
  const { type, message, statusCode, rentals } =
    await rentalService.queryRentals(req);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message),
      rentals
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    rentals
  });
});

/**
 * @desc      Get Rental Using It's ID Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.rentalId - Rental ID
 * @returns   { JSON } - A JSON object representing the type, message, and the rental
 */
export const getRental = catchAsync(async (req, res) => {
  // 1) Get rental using it's ID
  const { type, message, statusCode, rental } =
    await rentalService.queryRentalById(req.params.rentalId);

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
    rental
  });
});

/**
 * @desc      Create New Rental Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body object data
 * @property  { Object } req.files - Rental images
 * @property  { String } req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type, message and the rental
 */
export const addRental = catchAsync(async (req, res) => {
  const { body, files, user } = req;

  // 1) Create rental
  const { type, message, statusCode, errors,rental } =
    await rentalService.createRental(body, files, user.id);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message),
      errors
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    rental
  });
});

/**
 * @desc      Update Rental Details Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.rentalId - Rental ID
 * @property  { String } req.user.id - Seller ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the rental
 */
export const updateRentalDetails = catchAsync(async (req, res) => {
  // 1) Update rental details using it's ID
  const { type, message, statusCode, rental } =
    await rentalService.updateRentalDetails(
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

  // 3) If everything is OK, send rental
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    rental
  });
});

/**
 * @desc      Delete Rental Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.rentalId - Rental ID
 * @property  { String } req.user.id - Seller ID
 * @return    { JSON } - A JSON object representing the type and message
 */
export const deleteRental = catchAsync(async (req, res) => {
  // 1) Delete rental using it's ID
  const { type, message, statusCode } = await rentalService.deleteRental(
    req.params.rentalId,
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


/**
 * @desc    Get Top 5 Cheapeast Rental Controller
 * @param   { Object } req - Request object
 * @param   { Object } res - Response object
 * @param   { Object } next - Next function
 */
export const top5CheapRentals = catchAsync(async (req, res, next) => {
  // Limiting rentals to top 5 rentals
  // Sorting rentals according to it's price asc and according to ratings average des
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  next();
});

/**
 * @desc    Get Rental Statics Controller
 * @param   { Object } req - Request object
 * @param   { Object } res - Response object
 * @return  { JSON } - A JSON object representing the type, message and the stats
 */
export const rentalStats = catchAsync(async (req, res) => {
  // 1) Get rental stats
  const stats = await rentalService.getRentalStats();

  // 2) If everything is OK, send data
  return res.status(200).json({
    type: 'Success',
    message: req.polyglot.t('rentalStatics'),
    stats
  });
});
