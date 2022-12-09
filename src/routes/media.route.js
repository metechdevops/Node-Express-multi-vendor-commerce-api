// Packages
import express from 'express';

// Controllers
import { mediaController } from '../controllers/index';

// Middlewares
import protect from '../middlewares/protect';
import {handleMultipleImagesUpload} from '../middlewares/multipart/multipart-middleware';
// import restrictedTo from '../middlewares/restrictedTo';

const { createMedia } = mediaController;

// Router Initialization
const router = express.Router();

// Protect All Routes
router.use(protect);

// Get All Orders Route
// Create Media Route
// router.route('/').post(createMedia,handleMultipleImagesUpload("images"));
router.post('/:type/:platform', handleMultipleImagesUpload('images'), createMedia);

// Get Order Route
// Cancel Order Route
// router.route('/:id').get(getOrder).delete(cancelOrder);

// // Update Order Status
// router.patch('/:id', restrictedTo('admin'), orderStatus);

export default router;
