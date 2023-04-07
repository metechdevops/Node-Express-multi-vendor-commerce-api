const mongoose = require('mongoose');
const _ = require('lodash');

// Utils
import catchAsync from '../utils/catchAsync';
import {rentalListing} from '../utils/apiFeatures';

// Validation 
import {CreateSchema} from '../validators/entities/rental/create';
import validator from '../validators/field-validator';

// Model
import { Rental, Category, User } from '../models/index';

/**
 * @desc    Query rentals
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|rentals> }
 */
export const queryRentals = catchAsync(async (req) => {
  
  const populateQuery = [
    { path: 'seller', select: 'profileImage lastName firstName email'},
    { path: 'category', select: 'name image'},
    { path: 'subCategory', select: 'name image'},
  ]; 

  const rentals = await rentalListing(req, Rental, populateQuery);


  // 1) Check if porducts doesn't exist
  if (rentals.data.length < 1) {
    return {
      type: 'Error',
      message: 'noRentalsFound',
      statusCode: 404,
      rentals
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulRentalsFound',
    statusCode: 200,
    rentals
  };
});

/**
 * @desc    Query Rental Using It's ID
 * @param   { String } rentalId - Rental ID
 * @returns { Object<type|message|statusCode|rental> }
 */
export const queryRentalById = catchAsync(async (rentalId) => {
  
  const populateQuery = [
    { path: 'seller', select: 'profileImage lastName firstName email'},
    { path: 'category', select: 'name image'},
    { path: 'subCategory', select: 'name image'},
  ]; 

  const rental = await Rental.findById(rentalId)
    .populate(populateQuery)
    .lean();

  // 1) Check if rental doesn't exist
  if (!rental) {
    return {
      type: 'Error',
      message: 'noRentalFound',
      statusCode: 404
    };
  }

  // 2) If everything is OK, send rental
  return {
    type: 'Success',
    message: 'successfulRentalFound',
    statusCode: 200,
    rental
  };
});

/**
 * @desc    Create new rental
 * @param   { Object } body - Body object data
 * @param   { Object } files - Rental images
 * @param   { String } seller - Rental seller ID
 * @returns { Object<type|message|statusCode|rental> }
 */
export const createRental = catchAsync(async (body, files, seller) => {
  
  const {
    price,
    rentalId
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

  const rental_ID = body.rentalId

  delete body.rentalId

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
  
  // Get Rental Seller Info
  const sellerObject  = await User.findById(seller)
  if(sellerObject){
    body.seller = sellerObject._id
  }


  // 4) Create rental
  let rental = {} 
  
  if(rental_ID){
    rental = await Rental.findById(rentalId);
    if (!rental) {
      return {
        type: 'Error',
        message: 'noRentalFound',
        statusCode: 404
      };
    }
  }
  else 
    rental = await Rental.create(body);
  

  let response = {}
  if(rental_ID){
    
    // 2) Deep copy of two objects
    const newObject = _.merge(rental.toObject(), body);
    // write update to database
    await Rental.updateOne({_id:mongoose.Types.ObjectId(rental_ID)}, {$set: {...newObject}})
    response = newObject

  }else {
    response = await rental.save();
  }


  const message  = rental_ID ? 'successfulRentalDetails': 'successfulRentalCreate';
  const statusCode = rental_ID ? 200: 201;  

  // 8) If everything is OK, send data
  return {
    type: 'Success',
    message: message,
    statusCode: statusCode,
    rental: response
  };

});

/**
 * @desc    Update Rental Details
 * @param   { Object } body - Body object data
 * @param   { String } rentalId - Rental ID
 * @param   { String } sellerId - Seller ID
 * @returns { Object<type|message|statusCode|rental> }
 */
export const updateRentalDetails = catchAsync(
  async (rentalId, sellerId, body) => {
    const rental = await Rental.findById(rentalId);

    // 1) Check if rental doesn't exist
    if (!rental) {
      return {
        type: 'Error',
        message: 'noRentalFound',
        statusCode: 404
      };
    }

    // 2) Check if user isn't the owner of rental
    if (sellerId.toString() !== rental.seller.toString()) {
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

    // 3) Update rental by it's ID
    const result = await Rental.findByIdAndUpdate(rentalId, body, {
      new: true,
      runValidators: true
    });

    // 4) If everything is OK, send data
    return {
      type: 'Success',
      message: 'successfulRentalDetails',
      statusCode: 200,
      result
    };
  }
);

/**
 * @desc    Delete Rental Using It's ID
 * @param   { String } rentalId - Rental ID
 * @param   { String } sellerId - Seller ID
 * @returns { Object<type|message|statusCode> }
 */
export const deleteRental = catchAsync(async (rentalId, sellerId) => {

  const rental = await Rental.findById(rentalId);

  // 1) Check if rental doesn't exist
  if (!rental) {
    return {
      type: 'Error',
      message: `noRentalFound`,
      statusCode: 404
    };
  }

  // 2) Check if user isn't the owner of the rental
  if ( sellerId.toString() !== rental.seller.toString()) {
    return {
      type: 'Error',
      message: 'notSeller',
      statusCode: 403
    };
  }

  // 3) Delete rental using it's ID
  await Rental.findByIdAndDelete(rentalId);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulRentalDelete',
    statusCode: 200
  };
});

/**
 * @desc    Get Rentals Statics
 * @return  { Array<Stats> }
 */
export const getRentalStats = catchAsync(async () => {
  const stats = await Rental.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: '$category',
        'Number Of Rentals': { $sum: 1 },
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
        'Number Of Rentals': 1,
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
