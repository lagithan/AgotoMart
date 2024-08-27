import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  unitPrice: Number,
  quantity: Number,
  totalPrice: Number,
});

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  district: String,
  address: String,
  paymentMethod: String,
  items: { type: Map, of: itemSchema },  // Updated to store items as key-value pairs
  totalAmount: Number,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
