/* eslint-disable no-await-in-loop */
// Packages
import STRIPE_SDK from 'stripe';
import moment from 'moment';
import _ from "lodash";

// Utils
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import { processPaymentAuth } from '../utils/paymentProcessor';

// Configs
import config from '../config/config';

// Constant
import {
  BOOKING_STATUS,
  BOOKING_STATUS_ENUM,
  PAYMENT_STATUS
} from '../constants/constants';

// Models
import { serviceBooking, Service } from '../models/index';

const stripe = STRIPE_SDK(config.stripe.secret_key);

/**
 * @desc    Create New Order
 * @param   { Object } body - Body object data
 * @param   { Object } user - An object contains logged in user data
 * @returns { Object<type|message|statusCode|booking> }
 */
export const createServiceBooking = catchAsync(async (body, user) => {
  
  // 1) Extract data from parameters
  const { shippingAddress, paymentMethod, duration,service } = body;
  const { address, city, country, zipCode } = shippingAddress;

  // 2) Check if user entered all fields
  if (
    !address ||
    !city ||
    !zipCode ||
    !country ||
    !paymentMethod
  ) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }


  // 3) Get Selected Service
  const serviceObj = await Service.findById(service);

  // // 4) Check if service doesn't exist
  if (!serviceObj) {
    return {
      type: 'Error',
      message: 'noServiceFound',
      statusCode: 404
    };
  }


  // 5) If payment method is card then extract card data from body
  const { cardHolderName, cardNumber, expMonth, expYear, cvc } = body;
  // 6) Check if user entered card data
  if (!cardHolderName || !cardNumber || !expMonth || !expYear || !cvc) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  const totalPrice = _.round((duration * serviceObj.price),2)
  // 7) Process PowerTranz Card Payment
  const paymentResponse = 
  await processPaymentAuth(user,{totalPrice},body)

  const {TransactionIdentifier,Errors} =  paymentResponse 

  if (!_.isEmpty(Errors) && Errors.length > 0) {
    return {
      type: 'Error',
      message: paymentResponse.Errors[0].Message,
      statusCode: 400
    };
  }

  const serviceData = {
    user: user._id,
    seller: serviceObj.seller,
    service:serviceObj._id,
    price:serviceObj.price,
    totalPrice,
    duration,
    paymentStatus: PAYMENT_STATUS.PAID,
    status:BOOKING_STATUS.PENDING,
    bookingDate: moment(),
    shippingAddress,
    paymentMethod,
    paymentIdentifier: TransactionIdentifier,
  }

  // Set default pending status in booking tracking hoistory.
  serviceData.serviceTracking = [{ 
    status:BOOKING_STATUS.PENDING,
    trackingDate: new Date()
  }]


  // 9) Create booking with payment method card
  const booking = await serviceBooking.create(serviceData);

  // 13) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulServiceBookingCreate',
    statusCode: 201,
    booking,
    paymentResponse
  };
});

/**
 * @desc    Update ServiceBooking Status
 * @param   { String } status - ServiceBooking status
 * @param   { String } id - ServiceBooking ID
 * @returns { Object<type|message|statusCode> }
 */
export const serviceBookingStatus = catchAsync(async (status, id) => {
  // 1) All fields are required
  if (!status) {
    return {
      type: 'Error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  // 2) Check if status doesn't meet the enum
  if (!BOOKING_STATUS_ENUM.includes(status)) {
    return {
      type: 'Error',
      message: 'notInStatusEnum',
      statusCode: 400
    };
  }

  const booking = await serviceBooking.findById(id);

  // 3) Check if booking doesn't exist
  if (!booking) {
    return {
      type: 'Error',
      message: 'noServiceBooking',
      statusCode: 404
    };
  }

  // 5) Save booking new status
  booking.status = status;

  const trackingStatus = [...booking.serviceTracking]
  // 6) Update booking tracking history
  if(booking.serviceTracking.length == 0){
    trackingStatus.push({
      status
    });
  }else {
    booking.serviceTracking.map((item) => {
      if(item.status != status)
        trackingStatus.push({status}); 
    })
  }
  booking.serviceTracking = trackingStatus;

  await booking.save();

  // 7) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulStatusUpdate',
    statusCode: 200
  };
});

/**
 * @desc    Query Orders
 * @param   { Object } req - Request object
 * @returns { Object<type|message|statusCode|bookings> }
 */
export const queryServiceBookings = catchAsync(async (req) => {
  
  const {user} = req

  if(user.role == 'seller')
    // req.query.seller = { "$elemMatch" : {'seller.id':  user._id.toString() }};
    req.query.seller = req.user._id.toString();
  else if (user.role == 'user') 
    req.query.user = req.user._id.toString();
  

  const populateQuery = [
    { path: 'user', select: 'profileImage lastName firstName email'},
    { path: 'seller', select: 'profileImage lastName firstName email'},
    { path: 'service', select: 'mainImage price name'},
  ];

  // 1) Get all bookings
  const bookings = await APIFeatures(req, serviceBooking,populateQuery);

  // 2) Check of bookings doesn't exist
  if (!bookings) {
    return {
      type: 'Error',
      message: 'noServiceBookings',
      statusCode: 404
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulServiceBookingsFound',
    statusCode: 200,
    bookings
  };
});

/**
 * @desc    Query Order Using It's ID
 * @param   { String } id - Order ID
 * @returns { Object<type|message|statusCode|booking> }
 */
export const queryServiceBooking = catchAsync(async (id) => {
  // 1) Get booking document using it's ID
  const booking = await serviceBooking.findById(id);

  // 2) Check if booking doesn't exist
  if (!booking) {
    return {
      type: 'Error',
      message: 'noServiceBooking',
      statusCode: 404
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulServiceBookingFound',
    statusCode: 200,
    booking
  };
});

/**
 * @desc    Cancel Order
 * @param   { String } id - Order ID
 * @returns { Object<type|message|statusCode> }
 */
export const cancelServiceBooking = catchAsync(async (id) => {
  // 1) Find booking document and delete it
  const booking = await serviceBooking.findById(id);

  // 2) Check if booking doesn't exist
  if (!booking) {
    return {
      type: 'Error',
      message: 'noServiceBooking',
      statusCode: 404
    };
  }

  await serviceBooking.findByIdAndDelete(id);

  // 4) If everything is OK, send data
  return {
    type: 'Success',
    message: 'successfulServiceBookingDeleted',
    statusCode: 200
  };
});
