/* import Cart from '../Models/cartmodel.js';
import Product from '../Models/Productmodel.js';

// Add an item to the cart
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      // If cart exists, check if product already in cart
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
      if (itemIndex > -1) {
        // If product exists in the cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product not in the cart, add it
        cart.items.push({ productId, name: product.name, quantity, price: product.price });
      }
    } else {
      // If no cart exists, create a new one
      cart = new Cart({
        userId: req.user._id,
        items: [{ productId, name: product.name, quantity, price: product.price }],
        totalPrice: product.price * quantity,
      });
    }

    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart by user ID
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ message: 'Item not found in cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 */
import Cart from '../Models/cartmodel.js';
import Product from '../Models/Productmodel.js';

// Add an item to the cart
export const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
      if (itemIndex > -1) {
        // Update quantity if product exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add product if it does not exist
        cart.items.push({ productId, name: product.name, quantity, price: product.price });
      }
    } else {
      // Create a new cart if it does not exist
      cart = new Cart({
        userId: req.user._id,
        items: [{ productId, name: product.name, quantity, price: product.price }],
        totalPrice: product.price * quantity,
      });
    }

    // Update total price
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
