import mongoose from 'mongoose';
const CartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  items: {
    name: { type: String, required: true },
    image: {type:String,required: true},
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  }
  
});



const Cart = mongoose.model('Cart', CartSchema);
export default Cart;