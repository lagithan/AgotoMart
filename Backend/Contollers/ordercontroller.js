import Order from '../Models/ordermodel.js';

const placeOrder = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, district, address, paymentMethod, items } = req.body;

    console.log(items)

    const totalAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);

    const newOrder = new Order({
      firstName,
      lastName,
      phoneNumber,
      district,
      address,
      paymentMethod,
      items:[{
        name:items[0].name,
        unitPrice:items[0].unitPrice,
        quantity:items[0].quantity,
        totalPrice:items[0].totalPrice
      }],
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
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

export { placeOrder, getOrders, getOrderById };