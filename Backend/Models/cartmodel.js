import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the schema for cart items
const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Define the schema for the cart
const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [CartItemSchema],
}, { timestamps: true });

// Export the Cart model
const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
