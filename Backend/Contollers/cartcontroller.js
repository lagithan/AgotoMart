import { console } from 'inspector';
import Cart from '../Models/cartmodel.js';

// Fetch cart for a specific user
export const getCart = async (req, res) => {
  try {
    console.log(req.params.userId)
    const cart = await Cart.find({ user_id: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a cart item by ID
export const deleteCartItem = async (req, res) => {
  try {
    console.log(req.params.itemId);
    const itemId = req.params.itemId;
    await Cart.findByIdAndDelete(itemId);

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
};

// Add item to cart or update quantity if it already exists
export const addcart = async (req, res) => {
  try {
    const { userId, item } = req.body;
    console.log(item);

    const newCart = new Cart({
      user_id: userId,
      items: {
        name: item.name,
        image: item.image.url,
        unitPrice:item.price ,
        quantity:item.quantity,
        totalPrice: item.totalamount,
      }
    });
    // Save cart
    const cart1=await newCart.save();

    res.status(200);
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};