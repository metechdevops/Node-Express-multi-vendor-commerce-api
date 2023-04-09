// Packages
import express from 'express';

// Controllers
import { favoriteServiceController } from '../controllers';

// Middlewares
import protect from '../middlewares/protect';

const {
  addFavoriteService,
  getFavoriteServicesList,
  deleteServiceFromFavorite,
  checkServiceInFavoriteList
} = favoriteServiceController;

const router = express.Router();

// Add Service to Favorite List Route
// Get Service's of Favorite List Route
router
  .route('/')
  .post(protect, addFavoriteService)
  .get(protect, getFavoriteServicesList);

router.delete('/:serviceId', protect, deleteServiceFromFavorite);

router.get('/check/:serviceId', protect, checkServiceInFavoriteList);

export default router;
