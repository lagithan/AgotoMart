import Order from '../Models/ordermodel.js';

const placeOrder = async (req, res) => {
  try {
    // Log the entire request body to see what is being sent
    console.log('Request Body:', req.body);

    const { user_id, Name,phoneNumber, district, addressLine, paymentMethod, items } = req.body;


    // If user_id is undefined or missing, send an error response
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in the order' });
    }

    // Calculate the total amount
    const totalAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);

    // Create a new order with all items
    const newOrder = new Order({
      user_id,
      Name,
      phoneNumber,
      district,
      address:addressLine,
      paymentMethod,
      items: items.map(item => ({
        name: item.name,
        image: item.image,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        totalPrice: item.totalPrice
      })),
      totalAmount
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    // Log the order ID from the request parameters
    console.log(req.params.id);

    // Find the order by its ID
    const order = await Order.find({ user_id: req.params.id });

    // If the order is not found, return a 404 error
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Log the retrieved order for debugging purposes
    console.log(order);

    // Send the order details in the response
    res.status(200).json(order);
  } catch (error) {
    // Log any errors that occur during the request
    console.error('Error fetching order:', error);

    // Return a 500 error if the request fails
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    // If the order doesn't exist, return a 404 error
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return a success message
    res.status(200).json({ message: 'Order cancelled and deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};


export { placeOrder, getOrders, getOrderById, deleteOrder, updateOrderStatus};
