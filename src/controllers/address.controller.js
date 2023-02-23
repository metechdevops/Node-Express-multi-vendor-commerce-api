// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { addressService } from '../services/index';

/**
 * @desc      Get All Address Data Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields from data
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - number of items in page
 * @returns   { JSON } - A JSON object representing the type, message and address
 */
export const getAllAddress = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 2) Get all categories
  const { type, message, statusCode, address } =
    await addressService.queryAllAddress(req);

  // 3) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message)
    });
  }

  // 4) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    address
  });
});

/**
 * @desc      Get Address Using It's ID Address
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Address ID
 * @returns   { JSON } - A JSON object representing the type, message, and the address
 */
export const getAddress = catchAsync(async (req, res) => {
  // 1) Get address using it's ID
  const { type, message, statusCode, address } =
    await addressService.getAddress(req.params.id);

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
    address
  });
});

/**
 * @desc      Create New Address Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.body.name - Address name
 * @property  { String } req.body.description - Address description
 * @property  { Object } req.file - Address image
 * @returns   { JSON } - A JSON object representing the type, message and the category
 */
export const addAddress = catchAsync(async (req, res) => {
  // 1) Create new category
  const { type, message, statusCode, address, errors } = await addressService.createAddress(req.body,req.user);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message),
      errors:errors
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    address
  });
});

/**
 * @desc      Update Address Details Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Address ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message, and the category
 */
export const updateAddressDetails = catchAsync(async (req, res) => {
  // 1) Update category details using it's ID
  const { type, message, statusCode, address } =
    await addressService.updateAddressDetails(req.params.id, req.body);

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
    address
  });
});

/**
 * @desc      Update Address Image Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Address ID
 * @property  { Object } req.file - Address image
 * @returns   { JSON } - A JSON object representing the type, message, and the category
 */
export const updateAddressImage = catchAsync(async (req, res) => {
  // 1) Update category image using it's ID
  const { type, message, statusCode, address } =
    await addressService.updateAddressImage(req.params.id, req.file);

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
    address
  });
});

/**
 * @desc      Delete Address Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Address ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const deleteAddress = catchAsync(async (req, res) => {
  // 1) Find category using it's ID & delete it
  const { type, message, statusCode } =
    await addressService.deleteAddressById(req.params.id);

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
