// Packages
import express from 'express';

// Controllers
import { mediaController } from '../controllers/index';

// Middlewares
// import protect from '../middlewares/protect';
import {handleMultipleImagesUpload} from '../middlewares/multipart/multipart-middleware';

const { createMedia } = mediaController;

// Router Initialization
const router = express.Router();

// Protect All Routes
// router.use(protect);

// Create Media Route
router.post('/:directory/:client', handleMultipleImagesUpload('images'), createMedia);

export default router;
