import Order from '../Models/ordermodel.js';

const placeOrder = async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber, district, address, paymentMethod, items } = req.body;
  
      // Convert items to key-value pairs
      const formattedItems = items.reduce((acc, item, index) => {
        acc[`item_${index + 1}`] = item;
        return acc;
      }, {});
  
      const totalAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);
  
      const newOrder = new Order({
        firstName,
        lastName,
        phoneNumber,
        district,
        address,
        paymentMethod,
        items: formattedItems,  // Save formatted items
        totalAmount
      });
  
      await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Failed to place order' });
    }
  };
  
export { placeOrder};
