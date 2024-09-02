import Cart from '../models/cartmodel.js';

// Fetch cart for a specific user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart or update quantity if it already exists
export const addToCart = async (req, res) => {
  try {
    const { userId, item } = req.body;

    // Basic validation
    if (!userId || !item || !item.productId || !item.quantity) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [item] });
    } else {
      // Update existing cart
      const existingItemIndex = cart.items.findIndex(i => i.productId.toString() === item.productId.toString());

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += item.quantity;
        if (cart.items[existingItemIndex].quantity <= 0) {
          // Remove item if quantity is zero or negative
          cart.items.splice(existingItemIndex, 1);
        }
      } else {
        // Add new item to cart
        cart.items.push(item);
      }
    }

    // Save cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
