// Packages
import express from 'express';

// Controllers
import { authController } from '../controllers/index';

// Constants 
const {USER_ROLE} = require('../constants/constants')

// Middlewares
import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';

const {
  signin,
  sellerSignup,
  customerSignup,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  changePassword,
  updateCustomerProfile,
  getSellerProfile,
  updateSellerProfile
} = authController;

const router = express.Router();

router.post('/login', signin);

router.post('/register', customerSignup);

router.post('/seller/register', sellerSignup);

router.post('/logout', logout);

router.post('/tokens', refreshTokens);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/verify-email', verifyEmail);

router.use(protect);

router.post('/send-verification-email', sendVerificationEmail);

router.get('/seller/profile',restrictedTo(USER_ROLE.SELLER), getSellerProfile);

router.get('/customer/profile',restrictedTo(USER_ROLE.USER), getSellerProfile);

router.post('/customer/update-profile',restrictedTo(USER_ROLE.USER), updateCustomerProfile);

router.post('/seller/update-profile',restrictedTo(USER_ROLE.SELLER), updateSellerProfile);

router.patch('/change-password', changePassword);

export default router;
