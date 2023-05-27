// Packages 
const mongoose = require('mongoose');

// Utils
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import dataUri from '../utils/datauri';
import { uploadFile, destroyFile } from '../utils/cloudinary';
import {CreateSchema} from '../validators/entities/store/create';
import validator from '../validators/field-validator';


// Models
import { Store } from '../models/index';

/**
 * @desc    Create New Store
 * @param   { Object } body - Body object data
 * @param   { Object } file - Store image
 * @returns { Object<type|message|statusCode|category> }
 */
export const createStore = catchAsync(async (body,user) => {

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

  body.seller = user._id.toString()

  // 6) Create new category
  const store = await Store.create(body);


  // 7) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulStoreCreate',
    statusCode: 201,
    store
  };
});

/**
 * @desc    Query Categories
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|categories> }
 */
export const queryStores = catchAsync(async (req) => {
  // 1) Get all categories
  const stores = await APIFeatures(req, Store);

  // 2) Check if there are no categories
  if (stores.length === 0) {
    return {
      type: 'Error',
      message: 'noStores',
      statusCode: 404
    };
  }
  // 3) If everything is OK, send categories
  return {
    type: 'Success',
    message: 'successfulStoresFound',
    statusCode: 200,
    stores
  };
});

/**
 * @desc    Query Store Using It's ID
 * @param   { String } id - Store ID
 * @returns { Object<type|message|statusCode|category> }
 */
export const queryStore = catchAsync(async (id) => {
  const store = await Store.findById(id);

  // 1) Check if category doesn't exist
  if (!store) {
    return {
      type: 'Error',
      message: 'noStoreFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulStoreFound',
    statusCode: 200,
    store
  };
});

/**
 * @desc    Update Store Details
 * @param   { String } id - Store ID
 * @param   { Object } body - Store details
 * @returns { Object<type|message|statusCode|category> }
 */
export const updateStoreDetails = catchAsync(async (id, body) => {
  let category = await Store.findById(id);

  // 1) Check if category doesn't exist
  if (!category) {
    return {
      type: 'Error',
      message: 'noStoreFound',
      statusCode: 404
    };
  }

  // 2) Update category
  category = await Store.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });

  // 3) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulStoreDetails',
    statusCode: 200,
    category
  };
});

/**
 * @desc    Update Store Image
 * @param   { String } id - Store ID
 * @param   { Object } image - Store image
 * @returns { Object<type|message|statusCode|category> }
 */
export const updateStoreImage = catchAsync(async (id, image) => {
  // 1) Check if image provided
  if (image === undefined) {
    return {
      type: 'Error',
      message: 'categoryImageRequired',
      statusCode: 400
    };
  }

  let category = await Store.findById(id);

  // 2) Check if category doesn't exist
  if (!category) {
    return {
      type: 'Error',
      message: 'noStoreFound',
      statusCode: 404
    };
  }

  // 3) Destroy category current image from cloudinary
  destroyFile(category.imageId);

  // 4) Specifiy folder name where the images are going to be uploaded in cloudinary
  const folderName = `Store/${category.name.trim().split(' ').join('')}`;
  image = dataUri(image);
  image = await uploadFile(image.content, folderName, 600);

  // 5) Create category body object
  const body = {
    image: image.secure_url,
    imageId: image.public_id
  };

  // 6) Update category
  category = await Store.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });

  // 7) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulStoreImage',
    statusCode: 200,
    category
  };
});

/**
 * @desc    Delete Store
 * @param   { String } id - Store ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteStoreById = catchAsync(async (id) => {

  const store = await Store.findById(mongoose.Types.ObjectId(id));

  // 1) Check if store doesn't exist
  if (!store) {
    return {
      type: 'Error',
      message: 'noStoreFound',
      statusCode: 404
    };
  }

  // 3) Delete store
  await Store.findByIdAndDelete(mongoose.Types.ObjectId(id));

  // 4) If everything is OK, send date
  return {
    type: 'Success',
    message: 'successfulStoreDelete',
    statusCode: 200
  };
});
