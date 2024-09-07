import { Router } from 'express';
import { placeOrder, getOrders, getOrderById, deleteOrder, updateOrderStatus} from '../Contollers/ordercontroller.js';

const router = Router();

router.post('/place', placeOrder);
router.get('/all', getOrders);
router.get('/getyours/:id', getOrderById);
router.delete('/delete/:id', deleteOrder); 
router.put('/update/:id', updateOrderStatus);


export default router;
