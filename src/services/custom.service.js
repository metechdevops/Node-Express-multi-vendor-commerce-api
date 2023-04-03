const mongoose = require('mongoose');
const _ = require('lodash');

// Utils
import catchAsync from '../utils/catchAsync';
import {serviceListing} from '../utils/apiFeatures';

// Validation 
import {CreateSchema} from '../validators/entities/service/create';
import validator from '../validators/field-validator';

// Model
import { Service, Category, User } from '../models/index';

/**
 * @desc    Query services
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|services> }
 */
export const queryServices = catchAsync(async (req) => {
  
  const populateQuery = [
    { path: 'seller', select: 'profileImage lastName firstName email'},
    { path: 'category', select: 'name image'},
    { path: 'subCategory', select: 'name image'},
  ]; 

  const services = await serviceListing(req, Service, populateQuery);


  // 1) Check if porducts doesn't exist
  if (services.data.length < 1) {
    return {
      type: 'Error',
      message: 'noServicesFound',
      statusCode: 404,
      services
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulServicesFound',
    statusCode: 200,
    services
  };
});

/**
 * @desc    Query Service Using It's ID
 * @param   { String } serviceId - Service ID
 * @returns { Object<type|message|statusCode|service> }
 */
export const queryServiceById = catchAsync(async (serviceId) => {
  
  const populateQuery = [
    { path: 'seller', select: 'profileImage lastName firstName email'},
    { path: 'category', select: 'name image'},
    { path: 'subCategory', select: 'name image'},
  ]; 

  const service = await Service.findById(serviceId)
    .populate(populateQuery)
    .lean();

  // 1) Check if service doesn't exist
  if (!service) {
    return {
      type: 'Error',
      message: 'noServiceFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send service
  return {
    type: 'Success',
    message: 'successfulServiceFound',
    statusCode: 200,
    service
  };
});

/**
 * @desc    Create new service
 * @param   { Object } body - Body object data
 * @param   { Object } files - Service images
 * @param   { String } seller - Service seller ID
 * @returns { Object<type|message|statusCode|service> }
 */
export const createService = catchAsync(async (body, files, seller) => {
  
  const {
    price,
    serviceId
  } = body;


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

  const service_ID = body.serviceId

  delete body.serviceId

  body.price = Number(price) || 0

  // Get Category Info
  const category  = await Category.findById(body.category);
  if(category){
    body.category = category._id
  }

  // Get Sub Category Info
  const subCategory  = await Category.findById(body.subCategory);
  if(category){
    body.subCategory = subCategory._id
  }
  
  // Get Service Seller Info
  const sellerObject  = await User.findById(seller)
  if(sellerObject){
    body.seller = sellerObject._id
  }


  // 4) Create service
  let service = {} 
  
  if(service_ID){
    service = await Service.findById(serviceId);
    if (!service) {
      return {
        type: 'Error',
        message: 'noServiceFound',
        statusCode: 404
      };
    }
  }
  else 
    service = await Service.create(body);
  

  let response = {}
  if(service_ID){
    
    // 2) Deep copy of two objects
    const newObject = _.merge(service.toObject(), body);
    // write update to database
    await Service.updateOne({_id:mongoose.Types.ObjectId(service_ID)}, {$set: {...newObject}})
    response = newObject

  }else {
    response = await service.save();
  }


  const message  = service_ID ? 'successfulServiceDetails': 'successfulServiceCreate';
  const statusCode = service_ID ? 200: 201;  

  // 8) If everything is OK, send data
  return {
    type: 'Success',
    message: message,
    statusCode: statusCode,
    service: response
  };

});

/**
 * @desc    Update Service Details
 * @param   { Object } body - Body object data
 * @param   { String } serviceId - Service ID
 * @param   { String } sellerId - Seller ID
 * @returns { Object<type|message|statusCode|service> }
 */
export const updateServiceDetails = catchAsync(
  async (serviceId, sellerId, body) => {
    const service = await Service.findById(serviceId);

    // 1) Check if service doesn't exist
    if (!service) {
      return {
        type: 'Error',
        message: 'noServiceFound',
        statusCode: 404
      };
    }

    // 2) Check if user isn't the owner of service
    if (sellerId.toString() !== service.seller.toString()) {
      return {
        type: 'Error',
        message: 'notSeller',
        statusCode: 403
      };
    }

    // 3) Check if user try to update colors or sizes fields
    // if (body.colors || body.sizes) {
    //   return {
    //     type: 'Error',
    //     message: 'notColorOrSizesRoute',
    //     statusCode: 401
    //   };
    // }

    // 3) Update service by it's ID
    const result = await Service.findByIdAndUpdate(serviceId, body, {
      new: true,
      runValidators: true
    });

    // 4) If everything is OK, send data
    return {
      type: 'Success',
      message: 'successfulServiceDetails',
      statusCode: 200,
      result
    };
  }
);

/**
 * @desc    Delete Service Using It's ID
 * @param   { String } serviceId - Service ID
 * @param   { String } sellerId - Seller ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteService = catchAsync(async (serviceId, sellerId) => {

  const service = await Service.findById(serviceId);

  // 1) Check if service doesn't exist
  if (!service) {
    return {
      type: 'Error',
      message: `noServiceFound`,
      statusCode: 404
    };
  }

  // 2) Check if user isn't the owner of the service
  if ( sellerId.toString() !== service.seller.toString()) {
    return {
      type: 'Error',
      message: 'notSeller',
      statusCode: 403
    };
  }

  // 3) Delete service using it's ID
  await Service.findByIdAndDelete(serviceId);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulServiceDelete',
    statusCode: 200
  };
});

/**
 * @desc    Get Services Statics
 * @return  { Array<Stats> }
 */
export const getServiceStats = catchAsync(async () => {
  const stats = await Service.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: '$category',
        'Number Of Services': { $sum: 1 },
        'Number Of Ratings': { $sum: '$ratingsQuantity' },
        'Average Rating': { $avg: '$ratingsAverage' },
        'Average Price': { $avg: '$price' },
        'Minimum Price': { $min: '$price' },
        'Maximum Price': { $max: '$price' },
        Quantity: { $sum: '$quantity' }
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'Category'
      }
    },
    {
      $unwind: '$Category'
    },
    {
      $project: {
        _id: 0,
        'Number Of Services': 1,
        'Number Of Ratings': 1,
        'Average Rating': 1,
        'Average Price': 1,
        'Minimum Price': 1,
        'Maximum Price': 1,
        Quantity: 1,
        Category: {
          name: 1
        }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  return stats;
});
