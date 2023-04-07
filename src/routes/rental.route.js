// Packages
import express from 'express';

// Controllers
import { rentalController } from '../controllers/index';

// Middlewares
import protect from '../middlewares/protect';

// Utils
import { anyMulter } from '../utils/multer';

// Routes
import rentalReviewRoute from './rental.review.route';

const {
  getAllRentals,
  getRental,
  addRental,
  updateRentalDetails,
  deleteRental,
  top5CheapRentals,
  rentalStats
} = rentalController;

const router = express.Router();

router.use('/:rentalId/reviews', rentalReviewRoute);

router.get('/top-5-cheap', getAllRentals, top5CheapRentals);

router.get('/rental-stats', rentalStats);

router.get('/', getAllRentals);

router.get('/:rentalId', getRental);

router.use(protect);

router.post('/', anyMulter(), addRental);

router.patch('/:rentalId/details', updateRentalDetails);

router.delete('/:rentalId', deleteRental);

export default router;
