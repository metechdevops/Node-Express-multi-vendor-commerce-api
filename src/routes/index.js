import express from 'express';

import authRoute from './auth.route';
import userRoute from './user.route';
import productRoute from './product.route';
import serviceRoute from './service.route';
import categoryRoute from './category.route';
import storeRoute from './store.route';
import addressRoute from './address.route';
import lookupDataRoute from './lookup.data.route';
import cartRoute from './cart.route';
import orderRoute from './order.route';
import discountRoute from './discount.route';
import favoriteRoute from './favorite.route';
import mediaRoute from './media.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/product', productRoute);
router.use('/service', serviceRoute);
router.use('/category', categoryRoute);
router.use('/store', storeRoute);
router.use('/address', addressRoute);
router.use('/lookup-data', lookupDataRoute);
router.use('/cart', cartRoute);
router.use('/order', orderRoute);
router.use('/discount', discountRoute);
router.use('/favorite', favoriteRoute);
router.use('/media', mediaRoute);

export default router;
