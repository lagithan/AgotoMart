/* import express from 'express';
const router = express.Router();
import * as cartController from '../Contollers/cartcontroller.js'; // Use ES module import

// Route to add an item to the cart
router.post('/add-to-cart', cartController.addToCart);

// Route to get the cart for a specific user
router.get('/:userId', cartController.getCart);

export default router;
 */
import express from 'express';
import { addItemToCart, getCart, removeItemFromCart } from '../Contollers/cartcontroller.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addItemToCart).get(protect, getCart);
router.route('/:productId').delete(protect, removeItemFromCart);

export default router;
