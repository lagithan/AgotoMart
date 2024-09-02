// routes/cartroutes.js
import express from 'express';
import { getCart, addToCart } from '../contollers/cartcontroller.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/add', addToCart);

export default router;
