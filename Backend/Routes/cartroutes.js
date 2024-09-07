import express from 'express';
import { getCart, addcart, deleteCartItem } from '../contollers/cartcontroller.js';

const cartrouter = express.Router();

cartrouter.get('/:userId', getCart);
cartrouter.post('/add', addcart);
cartrouter.delete('/:itemId', deleteCartItem);

export default cartrouter;