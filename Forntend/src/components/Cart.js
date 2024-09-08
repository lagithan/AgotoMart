import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './viewcart.css';
import { useNavigate } from 'react-router-dom'; // To navigate to the OrderForm
import { UserContext } from './Userdata';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user_data } = useContext(UserContext);
  const [deleteState, setDelete] = useState(false);
  const navigate = useNavigate(); // For navigation

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/cart/${user_data.id}`);
      setCartItems(response.data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [deleteState]);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${itemId}`);
      setDelete(prevState => !prevState);
    } catch (error) {
      console.error('Error deleting cart item:', error.message);
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/cartorder', { state: { cartItems } }); // Pass cart items to the OrderForm
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={item.items.image} alt={item.items.name} />
                <div className="item-details">
                  <h3>{item.items.name}</h3>
                  <p>Quantity: {item.items.quantity}</p>
                  <p>Price: Rs. {item.items.unitPrice}</p>
                  <p>Total: Rs. {item.items.totalPrice}</p>
                  <button onClick={() => handleDelete(item._id)}>
                    <DeleteIcon sx={{color:'black'}} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="checkout-button" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
