import { Router } from 'express';
import { placeOrder } from '../Contollers/ordercontroller.js';

const router = Router();

router.post('/place', placeOrder);
export default router;
