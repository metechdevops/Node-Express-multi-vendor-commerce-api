// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { favoriteRentalService } from '../services';

/**
 * @desc      Get rental's favorite list controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String }  req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type, message and the favorite list
 */
export const getFavoriteRentalsList = catchAsync(async (req, res) => {
  // 1) Calling addFavoriteRental rental
  const { type, message, statusCode, favorite } =
    await favoriteRentalService.getFavoriteRentalsList(req.user.id);

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
 * @desc      Add rental to favorite list controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.body.rentalId - Rental ID
 * @property  { String }  req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const addFavoriteRental = catchAsync(async (req, res) => {
  // 1) Calling addFavoriteRental rental
  const { type, message, statusCode } =
    await favoriteRentalService.addFavoriteRental(req.user.id, req.body.rentalId);

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
 * @desc      delete rental from favorite list controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { String } req.params.id - Rental ID
 * @property  { String }  req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const deleteRentalFromFavorite = catchAsync(async (req, res) => {
  // 1) Calling deleteRentalFromFavorite rental
  const { type, message, statusCode } =
    await favoriteRentalService.deleteRentalFromFavorite(req.user.id, req.params.rentalId);

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
 * @desc      Check if rental in favorite list controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response
 * @property  { String } req.params.id - Rental ID
 * @property  { String }  req.user.id - User ID
 * @returns   { JSON } - A JSON object representing the type and message
 */
export const checkRentalInFavoriteList = catchAsync(async (req, res) => {
  // 1) Calling checkRentalInFavoriteList rental
  const { type, message, statusCode } =
    await favoriteRentalService.checkRentalInFavoriteList(
      req.user.id,
      req.params.rentalId
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
