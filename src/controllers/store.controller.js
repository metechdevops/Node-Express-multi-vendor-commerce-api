// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { storeService } from '../services/index';

/**
 * @desc      Get All Stores Data Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields from data
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - number of items in page
 * @returns   { JSON } - A JSON object representing the type, message and stores
 */
export const getAllStores = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 2) Get all categories
  const { type, message, statusCode, stores } =
    await storeService.queryStores(req);

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
    stores
  });
});

/**
 * @desc      Get Store Using It's ID Store
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Store ID
 * @returns   { JSON } - A JSON object representing the type, message, and the stores
 */
export const getStore = catchAsync(async (req, res) => {
  // 1) Get stores using it's ID
  const { type, message, statusCode, store } =
    await storeService.queryStore(req.params.id);

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
    store
  });
});

/**
 * @desc      Create New Store Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.body.name - Store name
 * @property  { String } req.body.description - Store description
 * @property  { Object } req.file - Store image
 * @returns   { JSON } - A JSON object representing the type, message and the category
 */
export const addStore = catchAsync(async (req, res) => {
  // 1) Create new category
  const { type, message, statusCode, store, errors } = await storeService.createStore(req.body,req.user);

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
    store
  });
});

/**
 * @desc      Update Store Details Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Store ID
 * @property  { Object } req.body - Body object data
 * @returns   { JSON } - A JSON object representing the type, message, and the category
 */
export const updateStoreDetails = catchAsync(async (req, res) => {
  // 1) Update category details using it's ID
  const { type, message, statusCode, category } =
    await storeService.updateStoreDetails(req.params.id, req.body);

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
    category
  });
});

/**
 * @desc      Update Store Image Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Store ID
 * @property  { Object } req.file - Store image
 * @returns   { JSON } - A JSON object representing the type, message, and the category
 */
export const updateStoreImage = catchAsync(async (req, res) => {
  // 1) Update category image using it's ID
  const { type, message, statusCode, category } =
    await storeService.updateStoreImage(req.params.id, req.file);

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
    category
  });
});

/**
 * @desc      Delete Store Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Store ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const deleteStore = catchAsync(async (req, res) => {
  // 1) Find category using it's ID & delete it
  const { type, message, statusCode } =
    await storeService.deleteStoreById(req.params.id);

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
