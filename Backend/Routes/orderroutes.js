import { Router } from 'express';
import { placeOrder, getOrders, getOrderById } from '../Contollers/ordercontroller.js';

const router = Router();

router.post('/place', placeOrder);
router.get('/all', getOrders);
router.get('/:id', getOrderById);

export default router;