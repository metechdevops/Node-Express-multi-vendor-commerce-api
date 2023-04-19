// Packages
import express from 'express';

// Controllers
import { serviceBookingController } from '../controllers/index';

// Middlewares
import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';

const { createServiceBooking, serviceBookingStatus, getAllServiceBookings, getServiceBooking, cancelServiceBooking } =
serviceBookingController;

// Router Initialization
const router = express.Router();

// Protect All Routes
router.use(protect);

// Get All ServiceBookings Route
router.route('/').get(getAllServiceBookings).post(createServiceBooking);

// Get ServiceBooking Route
// Cancel ServiceBooking Route
router.route('/:id').get(getServiceBooking).delete(cancelServiceBooking);

// Update ServiceBooking Status
router.patch('/:id', serviceBookingStatus);

export default router;
