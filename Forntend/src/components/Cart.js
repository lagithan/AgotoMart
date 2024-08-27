import React, { useState, useEffect } from 'react';
import './viewcart.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from 'axios';

const ViewCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/cart'); // Fetch cart items from backend
        setProducts(response.data.items);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateSubtotal = (price, quantity) => price * quantity;

  const calculateTotal = () =>
    products.reduce(
      (total, product) => total + calculateSubtotal(product.price, product.quantity),
      0
    );

  const handleQuantityChange = (index, delta) => {
    const newProducts = [...products];
    newProducts[index].quantity = Math.max(0, newProducts[index].quantity + delta);
    setProducts(newProducts);
  };

  const handleDelete = async (index) => {
    const productId = products[index].productId;
    try {
      await axios.delete(`/cart/${productId}`); // Remove item from cart
      const newProducts = products.filter((_, i) => i !== index);
      setProducts(newProducts);
    } catch (error) {
      console.error('Failed to delete item from cart:', error);
    }
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
          {products.map((product, index) => (
            <tr key={index} className="cart-item">
              <td>
                <img src={product.image} alt={product.name} className="product-image" />
                <span>{product.name}</span>
              </td>
              <td>Rs.{product.price.toFixed(2)}</td>
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
              <td>Rs.{calculateSubtotal(product.price, product.quantity).toFixed(2)}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(index)}>
                  <DeleteOutlineOutlinedIcon/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <span>Cart Total</span>
        <span>Rs.{calculateTotal().toFixed(2)}</span>
      </div>
      <button className="checkout-button">Check out</button>
    </div>
  );
};

export default ViewCart;
