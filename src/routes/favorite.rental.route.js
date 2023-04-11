// Packages
import express from 'express';

// Controllers
import { favoriteRentalController } from '../controllers';

// Middlewares
import protect from '../middlewares/protect';

const {
  addFavoriteRental,
  getFavoriteRentalsList,
  deleteRentalFromFavorite,
  checkRentalInFavoriteList
} = favoriteRentalController;

const router = express.Router();

// Add Rental to Favorite List Route
// Get Rental's of Favorite List Route
router
  .route('/')
  .post(protect, addFavoriteRental)
  .get(protect, getFavoriteRentalsList);

router.delete('/:rentalId', protect, deleteRentalFromFavorite);

router.get('/check/:rentalId', protect, checkRentalInFavoriteList);

export default router;
