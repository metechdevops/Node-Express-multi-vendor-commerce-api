// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { lookupDataService } from '../services/index';

/**
 * @desc      Get All Categories Data Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.query.sort - Sort returned data
 * @property  { String } req.query.select - Select specific fields from data
 * @property  { Number } req.query.page - Page number
 * @property  { Number } req.query.limit - number of items in page
 * @returns   { JSON } - A JSON object representing the type, message and categories
 */
export const getAllLookupData = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting default params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 2) Get all categories
  const { type, message, statusCode, data } =
    await lookupDataService.queryLookupData(req);

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
    data
  });
});

export const checkoutPayment = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // // 1) Setting default params
  // if (!page) page = 1;
  // if (!sort) sort = '';
  // if (!limit) limit = 10;
  // if (!select) select = '';

  // // 2) Get all categories
  // const { type, message, statusCode, data } =
  //   await lookupDataService.queryLookupData(req);

  // // 3) Check if there is an error
  // if (type === 'Error') {
  //   return res.status(statusCode).json({
  //     type,
  //     message: req.polyglot.t(message)
  //   });
  // }

  // 4) If everything is OK, send data
  return res.status(statusCode).json({
    // type,
    // message: req.polyglot.t(message),
    data:res.body.Response,

  });
});
