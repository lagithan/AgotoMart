import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
