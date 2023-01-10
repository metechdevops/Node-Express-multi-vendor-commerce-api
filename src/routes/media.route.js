// Packages
import express from 'express';

// Controllers
import { mediaController } from '../controllers/index';

// Middlewares
// import protect from '../middlewares/protect';
import {
    handleMultipleImagesUpload,
    handleMultipleDocsUpload
} 
from '../middlewares/multipart/multipart-middleware';

const { 
    createMedia,
    createDocumentMedia 
} = mediaController;

// Router Initialization
const router = express.Router();

// Protect All Routes
// router.use(protect);

// Create Media Route
router.post('/:directory/:client', handleMultipleImagesUpload('images'), createMedia);
router.post('/upload/:directory/document', handleMultipleDocsUpload('documents'), createDocumentMedia);

export default router;
