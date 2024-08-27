import Order from '../Models/ordermodel.js';

export const createOrder = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, district, address, paymentMethod, items } = req.body;

        const totalAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);

        const newOrder = new Order({
            firstName,
            lastName,
            phoneNumber,
            district,
            address,
            paymentMethod,
            items,
            totalAmount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};
