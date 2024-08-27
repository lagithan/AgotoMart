/* import { Router } from 'express';
import { createOrder, getOrder, updateOrder, deleteOrder, listOrders } from '../Controllers/OrderController.js';

const router = Router();

router.post('/create', createOrder);
router.get('/:id', getOrder);
router.put('/update/:id', updateOrder);
router.delete('/delete/:id', deleteOrder);
router.get('/', listOrders);

export default router;

 */

import { Router } from 'express';
import { createOrder } from '../Contollers/ordercontroller.js';

const orderRouter = Router();

orderRouter.post('/create', createOrder);

export default orderRouter;
