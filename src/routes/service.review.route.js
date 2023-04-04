// Packages
import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Controllers
import { serviceReviewController } from '../controllers/index';

const { getAllServiceReviews, getServiceReview, addServiceReview, updateServiceReview, deleteServiceReview } =
serviceReviewController;

// Router Initialization
const router = express.Router({ mergeParams: true });

// Get All Reviews Route
router.get('/', getAllServiceReviews);

// Get Review Route
router.get('/:reviewId', getServiceReview);

// Protect All Routes
router.use(protect);

// Add Review Route
router.post('/', addServiceReview);

// Update Review Route
// Delete Review Route
router.route('/:reviewId').patch(updateServiceReview).delete(deleteServiceReview);

export default router;
