// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { favoriteCustomService } from '../services';

/**
 * @desc      Get service's favorite list controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String }  req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type, message and the favorite list
 */
export const getFavoriteServicesList = catchAsync(async (req, res) => {
  // 1) Calling addFavoriteService service
  const { type, message, statusCode, favorite } =
    await favoriteCustomService.getFavoriteServicesList(req.user.id);

  // 2) Check if something went wrong
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
    favorite: favorite
  });
});

/**
 * @desc      Add service to favorite list controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.body.serviceId - Service ID
 * @property  { String }  req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const addFavoriteService = catchAsync(async (req, res) => {
  // 1) Calling addFavoriteService service
  const { type, message, statusCode } =
    await favoriteCustomService.addFavoriteService(req.user.id, req.body.serviceId);

  // 2) Check if something went wrong
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
 * @desc      delete service from favorite list controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Service ID
 * @property  { String }  req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const deleteServiceFromFavorite = catchAsync(async (req, res) => {
  // 1) Calling deleteServiceFromFavorite service
  const { type, message, statusCode } =
    await favoriteCustomService.deleteServiceFromFavorite(req.user.id, req.params.serviceId);

  // 2) Check if something went wrong
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
 * @desc      Check if service in favorite list controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response
 * @property  { String } req.params.id - Service ID
 * @property  { String }  req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const checkServiceInFavoriteList = catchAsync(async (req, res) => {
  // 1) Calling checkServiceInFavoriteList service
  const { type, message, statusCode } =
    await favoriteCustomService.checkServiceInFavoriteList(
      req.user.id,
      req.params.serviceId
    );

  // 2) Check if something went wrong
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
