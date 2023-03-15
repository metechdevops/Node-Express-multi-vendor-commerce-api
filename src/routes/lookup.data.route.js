// Packages
import express from 'express';

// Controllers
import { lookupDataController } from '../controllers/index';

const {
  getAllLookupData,
  checkoutPayment,
  processAuthPayment
} = lookupDataController;

// Router Initialization
const router = express.Router();

// Get All Categories Route
router.post('/checkout', checkoutPayment);
router.post('/process-payment', processAuthPayment);
router.get('/', getAllLookupData);


export default router;
