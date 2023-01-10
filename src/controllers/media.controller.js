// Utils
import _ from "lodash";
import catchAsync from '../utils/catchAsync';
import {imageUploads} from '../utils/media';

// Services
import { mediaService } from '../services/index';

/**
 * @desc      Create New Order Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body object data
 * @property  { Object } req.user - An object contains logged in user data
 * @return    { JSON } - A JSON object representing the type, message and the order
 */
export const createMedia = catchAsync(async (req, res) => {
  

  // 1) Get all orders
  const { type, message, statusCode, medias } = await mediaService.createMedia(req);

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
    medias
  });

});

/**
 * @desc      Create docuemtn media Controller
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } req.body - Body object data
 * @property  { Object } req.user - An object contains logged in user data
 * @return    { JSON } - A JSON object representing the type, message and the order
 */
export const createDocumentMedia = catchAsync(async (req, res) => {
  

  // 1) Get all orders
  const { type, message, statusCode, medias } = await mediaService.createDocumentMedia(req);

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
    medias
  });

});