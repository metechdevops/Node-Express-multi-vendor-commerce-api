// Packages
import express from 'express';

// Controllers
import { lookupDataController } from '../controllers/index';

const {
  getAllLookupData
} = lookupDataController;

// Router Initialization
const router = express.Router();

// Get All Categories Route
router.get('/', getAllLookupData);


export default router;
