const mongoose = require('mongoose');

// Configs
const tokenTypes = require('../config/tokens');

// Utils
import catchAsync from '../utils/catchAsync';
import validator from '../validators/field-validator';
import {registrationSchema} from '../validators/entities/customer/registration-schema';
import {customerProfileSchema} from '../validators/entities/customer/customer-profile-schema';
import {sellerValidationSchema} from '../validators/entities/seller/registration-schema';

const _ = require('lodash');


// Utils
import {
  sendVerificationEmail,
  sendAfterResetPasswordMessage
} from '../utils/sendEmail';

// Middlewares
import {
  verifyToken,
  generateAuthTokens,
  generateVerifyEmailToken
} from '../middlewares/token';

// Models
import { User, Token } from '../models/index';

/**
 * @desc    Customer Sign Up Service
 * @param   { Object } body - Body object data
 * @param   { Object } profileImage - User profile image
 * @return  { Object<type|statusCode|message|user|tokens> }
 */
export const customerSignup = catchAsync(async (body) => {
  

  const { email, role } = body;

  // 1) Validate required fields
  let fieldErrors = validator.validate(body,registrationSchema);
  
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

  const isEmailTaken = await User.isEmailTaken(email);

  // 4) Check if the email already taken
  if (isEmailTaken) {
    return {
      type: 'Error',
      message: 'emailTaken',
      statusCode: 409
    };
  }

  // 5) Specifiy folder name where the images are going to be uploaded in cloudinary
  // const folderName = `Users/${name.trim().split(' ').join('')}`;

  // 5) Create new user account
  const user = await User.create(body);

  // 8) Generate tokens (access token & refresh token)
  const tokens = await generateAuthTokens(user);

  // 9) Generate Verification Email Token
  const verifyEmailToken = await generateVerifyEmailToken(user);

  // 10) Sending Verification Email
  await sendVerificationEmail(user.email, verifyEmailToken);

  // 11) Remove the password from the output
  user.password = undefined;

  // 12) If everything is OK, send user data
  return {
    type: 'Success',
    statusCode: 201,
    message: 'successfulSignUp',
    user,
    tokens
  };

});


/**
 * @desc    Sign Up Service
 * @param   { Object } body - Body object data
 * @param   { Object } profileImage - User profile image
 * @return  { Object<type|statusCode|message|user|tokens> }
 */
export const sellerSignup = catchAsync(async (body) => {
  

  const {email } = body;

  // 1) Validate required fields
  let fieldErrors = validator.validate(body,sellerValidationSchema);
  
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

  // 3) Check if the email already taken
  const isEmailTaken = await User.isEmailTaken(email);

  // 4) Check if the email already taken
  if (isEmailTaken) {
    return {
      type: 'Error',
      message: 'emailTaken',
      statusCode: 409
    };
  }

  // 5) Create new user account
  const user = await User.create(body);

  // 6) Generate tokens (access token & refresh token)
  const tokens = await generateAuthTokens(user);

  // 7) Generate Verification Email Token
  const verifyEmailToken = await generateVerifyEmailToken(user);

  // 8) Sending Verification Email
  await sendVerificationEmail(user.email, verifyEmailToken);

  // 9) Remove the password from the output
  user.password = undefined;

  // 10) If everything is OK, send user data
  return {
    type: 'Success',
    statusCode: 201,
    message: 'successfulSignUp',
    user,
    tokens
  };
  
});

/**
 * @desc    Sign In Service
 * @param   { String } email - User email address
 * @param   { String } password - User password
 * @return  { Object<type|statusCode|message|user|tokens> }
 */
export const signin = catchAsync(async (email, password) => {
  // 1) Check if email and password exist
  if (!email || !password) {
    return {
      statusCode: 400,
      message: 'emailPasswordRequired'
    };
  }

  // 2) Get user from database
  const user = await User.findOne({ email }).select('+password');

  // 3) Check if user does not exist
  if (!user) {
    return {
      statusCode: 401,
      message: 'incorrectEmailOrPassword'
    };
  }

  // 5) Check if user does not exist
  // if (!user.isEmailVerified) {
  //   return {
  //     statusCode: 401,
  //     message: 'isUserVerified'
  //   };
  // }

  const isMatch = await user.isPasswordMatch(password);

  // 6) Check if passwords match
  if (!isMatch) {
    return {
      statusCode: 401,
      message: 'incorrectEmailOrPassword'
    };
  }

  // 7) Generate authentication tokens
  const tokens = await generateAuthTokens(user);

  // 8) If everything ok, send data
  return {
    type: 'Success',
    statusCode: 200,
    message: 'successfulLogin',
    user,
    tokens
  };
});

/**
 * @desc    Logout Service
 * @param   { String } refreshToken - User's refresh token
 * @return  { Object }
 */
export const logout = catchAsync(async (refreshToken) => {
  // 1) Find token document and delete it
  const refreshTokenDoc = await Token.findOneAndDelete({
    token: refreshToken,
    type: tokenTypes.REFRESH
  });

  // 2) Check if token already exist
  if (!refreshTokenDoc) {
    return {
      type: 'Error',
      statusCode: 401,
      message: 'loginAgain'
    };
  }

  // 3) If everything ok, send data
  return {
    type: 'Success',
    statusCode: 200,
    message: 'successfulogout'
  };
});

/**
 * @desc    Refresh Auth Tokens Service
 * @param   { String } refreshToken - User's refresh token
 * @return  { Object<type|statusCode|message|tokens> }
 */
export const refreshAuth = catchAsync(async (refreshToken) => {
  // 1) Verify refresh token
  const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);

  // 2) Check if refresh token document already exist
  if (!refreshTokenDoc) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'No token found.'
    };
  }

  const user = await User.findById(refreshTokenDoc.user);

  // 3) Check if user already exist
  if (!user) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noUserFound'
    };
  }

  // 4) Generate authentication tokens
  const tokens = await generateAuthTokens(user);

  // 5) If everything is OK, send data
  return {
    type: 'Success',
    statusCode: 200,
    message: 'successfulTokenGeneration',
    tokens
  };
});

/**
 * @desc    Change Password Service
 * @param   { String } currentPassword - Current user password
 * @param   { String } password - User's password
 * @param   { String } passwordConfirmation - User's password confirmation
 * @param   { String } userId - User ID
 * @return  { Object<type|statusCode|message> }
 */
export const changePassword = catchAsync(
  async (currentPassword, password, passwordConfirmation, userId) => {
    // 1) Check if password and passwordConfirmation are not the same
    if (password !== passwordConfirmation) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'passConfirm'
      };
    }

    const user = await User.findById(userId).select('+password');

    const isMatch = await user.isPasswordMatch(currentPassword);

    // 2) Check if currentPassword isn't the same of user password
    if (!isMatch) {
      return {
        type: 'Error',
        message: 'notSamePassword',
        statusCode: 400
      };
    }

    // 3) Update user password
    user.password = password;
    user.passwordConfirmation = passwordConfirmation;

    await user.save();

    // 4) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfulPasswordChange'
    };
  }
);

/**
 * @desc    Update Customer Profile Service
 * @return  { Object<type|statusCode|message> }
 */
export const updateCustomerProfile = catchAsync(
async ({body,user}) => {

    const {firstName,lastName,profileImage} = body;
    // 1) Validate required fields
    let fieldErrors = validator.validate(body,customerProfileSchema);
    
    // 2) Check if body request data is valid.
    if(fieldErrors){

      // fieldErrors = fieldErrors.map((item) => item.message)
      return {
        type: 'Error',
        message: 'fieldsRequired',
        statusCode: 400,
        errors: fieldErrors
      };
    }
    
    // 3) Get user data.
    const customer = await User.findById(user.id);

    // 4) Update user data
    customer.firstName = firstName;
    customer.lastName = lastName;

    // 5) set profile images 
    if(profileImage){
      customer.profileImage = {...profileImage};
    }

    await customer.save();

    // 6) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfullyProfileUpdated',
      customer:customer
    };
  }
);

/**
 * @desc    Update Customer Profile Service
 * @return  { Object<type|statusCode|message> }
 */
export const updateSellerProfile = catchAsync(
  async ({body,user}) => {
  
      // 1) Get user data.
      let seller = await User.findById(user.id);
      
      // 2) Deep copy of two objects
      const newObject = _.merge(seller.toObject(), body);
      // write update to database
      await User.updateOne({_id:mongoose.Types.ObjectId(user._id)}, {$set: {...newObject}})
  
      // 3) If everything is OK, send data
      return {
        type: 'Success',
        statusCode: 200,
        message: 'successfullyProfileUpdated',
        seller:newObject
      };
    }
  );

/**
 * @desc    Reset Password Service
 * @param   { String } token - Reset password token
 * @param   { String } password - User's password
 * @param   { String } passwordConfirmation - User's password confirmation
 * @return  { Object<type|statusCode|message> }
 */
export const resetPassword = catchAsync(
  async (token, password, passwordConfirmation) => {
    // 1) Check if password and passwordConfirmation are not the same
    if (password !== passwordConfirmation) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'passConfirm'
      };
    }

    // 2) Verify reset password token
    const resetPasswordTokenDoc = await verifyToken(
      token,
      tokenTypes.RESET_PASSWORD
    );

    // 3) Check if reset password token document already exists
    if (!resetPasswordTokenDoc) {
      return {
        type: 'Error',
        statusCode: 400,
        message: 'invalidLink'
      };
    }

    const user = await User.findById(resetPasswordTokenDoc.user);

    // 4) Check if user already exist
    if (!user) {
      return {
        type: 'Error',
        statusCode: 404,
        message: 'noUserFound'
      };
    }

    // 5) Save user password
    user.password = password;

    await user.save();

    // 6) Sending after reset password mail
    await sendAfterResetPasswordMessage(user.email);

    // 7) Deleteing user reset token
    await Token.findByIdAndDelete(user.id, {
      type: tokenTypes.RESET_PASSWORD
    });

    // 8) If everything is OK, send data
    return {
      type: 'Success',
      statusCode: 200,
      message: 'successfulPasswordChange'
    };
  }
);

/**
 * @desc    Verify Email Service
 * @param   { String } verifyEmailToken - Email verification token
 * @returns { Object<type|statusCode|message> }
 */
export const verifyEmail = catchAsync(async (verifyEmailToken) => {
  // 1) Verify email token
  const verifyEmailTokenDoc = await verifyToken(
    verifyEmailToken,
    tokenTypes.VERIFY_EMAIL
  );

  const user = await User.findById(verifyEmailTokenDoc.user);

  // 2) Check if user already exist
  if (!user) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'noUserFound'
    };
  }

  // 3) Deleting user verify email token
  await Token.findByIdAndDelete(user.id, { type: tokenTypes.VERIFY_EMAIL });

  // 4) Update user isEmailVerified filed (set true)
  await User.findByIdAndUpdate(user.id, { isEmailVerified: true });

  // 5) If everything is OK, send data
  return {
    type: 'Sucess',
    statusCode: 200,
    message: 'successfulEmailVerification'
  };
});
