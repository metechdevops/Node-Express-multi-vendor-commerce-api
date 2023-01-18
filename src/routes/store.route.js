// Packages
import express from 'express';

// Middlewares
import protect from '../middlewares/protect';

// Controllers
import { storeController } from '../controllers/index';

const {
  getAllStores,
  getStore,
  addStore,
  updateStoreDetails,
  // updateStoreImage,
  deleteStore
} = storeController;

// Router Initialization
const router = express.Router();

// Get All Categories Route
router.get('/', getAllStores);

// Get Store Route
router.get('/:id', getStore);

// Protect All Next Routes
router.use(protect);

// Add Store (Multer Middleware) Route
router.post('/', addStore);

// Update Store details Route
// Delete Store Route
router.route('/:id').patch(updateStoreDetails).delete(deleteStore);

// Update Store Image (Multer Middleware) Route
// router.patch('/:id/image', singleFile('image'), updateStoreImage);

export default router;
