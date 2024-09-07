import express from 'express';
import { getCart, addcart, deleteCartItem } from '../contollers/cartcontroller.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/add', addcart);
router.delete('/:itemId', deleteCartItem);

export default router;