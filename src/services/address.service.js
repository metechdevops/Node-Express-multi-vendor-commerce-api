// Packages 
const mongoose = require('mongoose');

// Utils
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import dataUri from '../utils/datauri';
import { uploadFile, destroyFile } from '../utils/cloudinary';
import {CreateSchema} from '../validators/entities/address/create';
import validator from '../validators/field-validator';

// Models
import { Address } from '../models/index';

/**
 * @desc    Create New Address
 * @param   { Object } body - Body object data
 * @param   { Object } file - Address image
 * @returns { Object<type|message|statusCode|address> }
 */
export const createAddress = catchAsync(async (body,user) => {

  // 1) Validate required fields
  let fieldErrors = validator.validate(body,CreateSchema);
  
  // 2) Check if body request data is valid.
  if(fieldErrors){

    fieldErrors = fieldErrors.map((item) => item.message)
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400,
      errors: fieldErrors
    };
  }

  body.user = user._id

  // 6) Create new address
  const address = await Address.create(body);

  // 7) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulAddressCreate',
    statusCode: 201,
    address
  };
});

/**
 * @desc    Query Categories
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|address> }
 */
export const queryAllAddress = catchAsync(async (req,user) => {
  

  // 1) Get all address
  const address = await APIFeatures(req, Address);

  // 2) Check if there are no address
  if (address.data.length === 0) {
    return {
      type: 'Error',
      message: 'noAddresss',
      statusCode: 404
    };
  }
  // 3) If everything is OK, send address
  return {
    type: 'Success',
    message: 'successfulAddresssFound',
    statusCode: 200,
    address
  };
});

/**
 * @desc    Query Address Using It's ID
 * @param   { String } id - Address ID
 * @returns { Object<type|message|statusCode|address> }
 */
export const getAddress = catchAsync(async (id) => {
  const address = await Address.findById(id);

  // 1) Check if address doesn't exist
  if (!address) {
    return {
      type: 'Error',
      message: 'noAddressFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulAddressFound',
    statusCode: 200,
    address
  };
});

/**
 * @desc    Update Address Details
 * @param   { String } id - Address ID
 * @param   { Object } body - Address details
 * @returns { Object<type|message|statusCode|address> }
 */
export const updateAddressDetails = catchAsync(async (id, body) => {
  let address = await Address.findById(id);

  // 1) Check if address doesn't exist
  if (!address) {
    return {
      type: 'Error',
      message: 'noAddressFound',
      statusCode: 404
    };
  }

  // 2) Update address
  address = await Address.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });

  // 3) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulAddressDetails',
    statusCode: 200,
    address
  };
});

/**
 * @desc    Update Address Image
 * @param   { String } id - Address ID
 * @param   { Object } image - Address image
 * @returns { Object<type|message|statusCode|address> }
 */
export const updateAddressImage = catchAsync(async (id, image) => {
  // 1) Check if image provided
  if (image === undefined) {
    return {
      type: 'Error',
      message: 'addressImageRequired',
      statusCode: 400
    };
  }

  let address = await Address.findById(id);

  // 2) Check if address doesn't exist
  if (!address) {
    return {
      type: 'Error',
      message: 'noAddressFound',
      statusCode: 404
    };
  }

  // 3) Destroy address current image from cloudinary
  destroyFile(address.imageId);

  // 4) Specifiy folder name where the images are going to be uploaded in cloudinary
  const folderName = `Address/${address.name.trim().split(' ').join('')}`;
  image = dataUri(image);
  image = await uploadFile(image.content, folderName, 600);

  // 5) Create address body object
  const body = {
    image: image.secure_url,
    imageId: image.public_id
  };

  // 6) Update address
  address = await Address.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });

  // 7) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulAddressImage',
    statusCode: 200,
    address
  };
});

/**
 * @desc    Delete Address
 * @param   { String } id - Address ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteAddressById = catchAsync(async (id) => {

  const store = await Address.findById(mongoose.Types.ObjectId(id));

  // 1) Check if store doesn't exist
  if (!store) {
    return {
      type: 'Error',
      message: 'noAddressFound',
      statusCode: 404
    };
  }

  // 3) Delete store
  await Address.findByIdAndDelete(mongoose.Types.ObjectId(id));

  // 4) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulAddressDelete',
    statusCode: 200
  };
});
