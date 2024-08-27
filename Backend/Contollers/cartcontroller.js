import Cart from '../Models/cartmodel.js';

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Cart exists for the user, update it
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      
      if (itemIndex > -1) {
        // If product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product does not exist in cart, add it
        cart.items.push({ productId, quantity });
      }
    } else {
      // No cart for the user, create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};
