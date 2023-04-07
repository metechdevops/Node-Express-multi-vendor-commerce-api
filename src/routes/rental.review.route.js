// Packages
import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Controllers
import { rentalReviewController } from '../controllers/index';

const { getAllRentalReviews, getRentalReview, addRentalReview, updateRentalReview, deleteRentalReview } =
rentalReviewController;

// Router Initialization
const router = express.Router({ mergeParams: true });

// Get All Reviews Route
router.get('/', getAllRentalReviews);

// Get Review Route
router.get('/:reviewId', getRentalReview);

// Protect All Routes
router.use(protect);

// Add Review Route
router.post('/', addRentalReview);

// Update Review Route
// Delete Review Route
router.route('/:reviewId').patch(updateRentalReview).delete(deleteRentalReview);

export default router;
