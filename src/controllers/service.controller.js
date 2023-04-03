// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { customService } from '../services/index';

/**
 * @desc      Get All Service Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - Maximum number of services
 * @returns   { JSON } - A JSON object representing the type, message and the services
 */
export const getAllServices = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) req.query.page = 1;
  if (!sort) req.query.sort = '';
  if (!limit) req.query.limit = 10;
  if (!select) req.query.select = '';

  // 1) Get all services
  const { type, message, statusCode, services } =
    await customService.queryServices(req);

  // 2) Check if there is an error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message: req.polyglot.t(message),
      services
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    services
  });
});

/**
 * @desc      Get Service Using It's ID Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.serviceId - Service ID
 * @returns   { JSON } - A JSON object representing the type, message, and the service
 */
export const getService = catchAsync(async (req, res) => {
  // 1) Get service using it's ID
  const { type, message, statusCode, service } =
    await customService.queryServiceById(req.params.serviceId);

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
    service
  });
});

/**
 * @desc      Create New Service Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body object data
 * @property  { Object } req.files - Service images
 * @property  { String } req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type, message and the service
 */
export const addService = catchAsync(async (req, res) => {
  const { body, files, user } = req;

  // 1) Create service
  const { type, message, statusCode, errors,service } =
    await customService.createService(body, files, user.id);

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
    service
  });
});

/**
 * @desc      Update Service Details Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.serviceId - Service ID
 * @property  { String } req.user.id - Seller ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message and the service
 */
export const updateServiceDetails = catchAsync(async (req, res) => {
  // 1) Update service details using it's ID
  const { type, message, statusCode, service } =
    await customService.updateServiceDetails(
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

  // 3) If everything is OK, send service
  return res.status(statusCode).json({
    type,
    message: req.polyglot.t(message),
    service
  });
});

/**
 * @desc      Delete Service Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.serviceId - Service ID
 * @property  { String } req.user.id - Seller ID
 * @return    { JSON } - A JSON object representing the type and message
 */
export const deleteService = catchAsync(async (req, res) => {
  // 1) Delete service using it's ID
  const { type, message, statusCode } = await customService.deleteService(
    req.params.serviceId,
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
 * @desc    Get Top 5 Cheapeast Service Controller
 * @param   { Object } req - Request object
 * @param   { Object } res - Response object
 * @param   { Object } next - Next function
 */
export const top5CheapServices = catchAsync(async (req, res, next) => {
  // Limiting services to top 5 services
  // Sorting services according to it's price asc and according to ratings average des
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  next();
});

/**
 * @desc    Get Service Statics Controller
 * @param   { Object } req - Request object
 * @param   { Object } res - Response object
 * @return  { JSON } - A JSON object representing the type, message and the stats
 */
export const serviceStats = catchAsync(async (req, res) => {
  // 1) Get service stats
  const stats = await customService.getServiceStats();

  // 2) If everything is OK, send data
  return res.status(200).json({
    type: 'Success',
    message: req.polyglot.t('serviceStatics'),
    stats
  });
});
