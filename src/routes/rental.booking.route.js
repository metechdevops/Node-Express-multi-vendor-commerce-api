// Packages
import express from 'express';

// Controllers
import { rentalBookingController } from '../controllers/index';

// Middlewares
import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';

const { createRentalBooking, rentalBookingStatus, getAllRentalBookings, getRentalBooking, cancelRentalBooking } =
rentalBookingController;

// Router Initialization
const router = express.Router();

// Protect All Routes
router.use(protect);

// Get All RentalBookings Route
router.route('/').get(getAllRentalBookings).post(createRentalBooking);

// Get RentalBooking Route
// Cancel RentalBooking Route
router.route('/:id').get(getRentalBooking).delete(cancelRentalBooking);

// Update RentalBooking Status
router.patch('/:id', rentalBookingStatus);

export default router;
