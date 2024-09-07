import {addPayment,getproduct,updatePaymentMethod,deletepaymentMethod} from './../Contollers/paymentController.js';
import {Router} from 'express';

const payment = Router();

payment.post('/add',addPayment);
payment.get('/get/:userid',getproduct);
payment.put('/update/:id',updatePaymentMethod);
payment.delete('/delete/:id',deletepaymentMethod);
export default payment;