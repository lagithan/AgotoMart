import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './viewcart.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ViewCart = () => {
  const [products, setProducts] = useState([]); // Initialize as empty array
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = 'user-id-from-context-or-auth'; // Replace with actual user ID
        const response = await fetch(`/cart/${userId}`); // Fetch items from your backend API
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched cart data:', data); // Debugging: log fetched data
        
        if (data.items) {
          setProducts(data.items); // Update state with fetched items
        } else {
          setProducts([]); // Set to empty array if no items are found
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setProducts([]); // Ensure products is still an array
      }
    };

    fetchCartItems();
  }, []);

  const calculateSubtotal = (price, quantity) => price * quantity;

  const calculateTotal = () =>
    products.reduce(
      (total, product) => total + calculateSubtotal(product.productId.price, product.quantity),
      0
    );

  const handleQuantityChange = (index, delta) => {
    const newProducts = [...products];
    newProducts[index].quantity = Math.max(0, newProducts[index].quantity + delta);
    setProducts(newProducts);
  };

  const handleDelete = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleCheckout = () => {
    navigate('/index/orderform', { state: { cartItems: products } }); // Navigate to orderform with cart items
  };

  return (
    <div className="cart-table-container">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index} className="cart-item">
                <td>
                  <img src={product.productId.image} alt={product.productId.name} className="product-image" />
                  <span>{product.productId.name}</span>
                </td>
                <td>Rs.{product.productId.price.toFixed(2)}</td>
                <td>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                  <span className="quantity-text">{product.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                </td>
                <td>Rs.{calculateSubtotal(product.productId.price, product.quantity).toFixed(2)}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(index)}>
                    <DeleteOutlineOutlinedIcon/>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No items in cart</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="cart-total">
        <span>Cart Total</span>
        <span>Rs.{calculateTotal().toFixed(2)}</span>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Check out</button>
    </div>
  );
};

export default ViewCart;
