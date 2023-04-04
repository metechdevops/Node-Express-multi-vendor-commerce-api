// Packages
import express from 'express';

// Controllers
import { serviceController } from '../controllers/index';

// Middlewares
import protect from '../middlewares/protect';

// Utils
import { anyMulter } from '../utils/multer';

// Routes
import serviceReviewRoute from './service.review.route';

const {
  getAllServices,
  getService,
  addService,
  updateServiceDetails,
  deleteService,
  top5CheapServices,
  serviceStats
} = serviceController;

const router = express.Router();

router.use('/:serviceId/reviews', serviceReviewRoute);

router.get('/top-5-cheap', getAllServices, top5CheapServices);

router.get('/service-stats', serviceStats);

router.get('/', getAllServices);

router.get('/:serviceId', getService);

router.use(protect);

router.post('/', anyMulter(), addService);

router.patch('/:serviceId/details', updateServiceDetails);

router.delete('/:serviceId', deleteService);

export default router;
