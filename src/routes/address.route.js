// Packages
import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Controllers
import { addressController } from '../controllers/index';

const {
  getAllAddress,
  getAddress,
  addAddress,
  updateAddressDetails,
  deleteAddress
} = addressController;

// Router Initialization
const router = express.Router();

// Get All Categories Route
router.get('/', getAllAddress);

// Get address Route
router.get('/:id', getAddress);

// Protect All Next Routes
router.use(protect);

// Add address (Multer Middleware) Route
router.post('/', addAddress);

// Update address details Route
// Delete address Route
router.route('/:id').patch(updateAddressDetails).delete(deleteAddress);


export default router;
