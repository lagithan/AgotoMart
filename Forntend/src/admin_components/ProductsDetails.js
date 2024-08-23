import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Popup from './Popup';
import './productdetails.css';
import axios from 'axios';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    image: null
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/get');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      if (editProductIndex !== null) {
        // Update existing product
        const productId = products[editProductIndex]._id;
        await axios.put(`http://localhost:5000/product/update/${productId}`, formData);
      }
      else {
        await axios.post('http://localhost:5000/product/add', formData);
      }

      fetchProducts();
      setEditProductIndex(null);
    }
    catch (err) {
      console.error('Error adding/updating product:', err);
    }

    setFormData({
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: '',
      image: null
    });
    setButtonPopup(false);
    setEditProductIndex(null);
  };


  const handleEditClick = (index) => {
    const product = products[index];
    setEditProductIndex(index);
    setFormData({
      ...product,
    });
    setButtonPopup(true);
  };

  const handleDeleteClick = async (index) => {
    try {
      const productId = products[index]._id;
      await axios.delete(`http://localhost:5000/product/delete/${productId}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.replace(/\s+/g, '').toLowerCase().includes(searchTerm.replace(/\s+/g, '').toLowerCase())
  );

  return (
    <div className="product-details-container">
      <div className='product-header'>
        <h2>Product Details</h2>
        <button onClick={() => setButtonPopup(true)} className='add-button'>Add Product</button>
      </div>

      <div className='search-container'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by product name"
          className='search-input'
        />
        <button className='search-button'>Search</button>
      </div>

      <div className='table-container'>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td className="action-buttons">
                  <button className="update-button" onClick={() => handleEditClick(index)}>
                    <MdEdit className='icon' /> Update
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteClick(index)}>
                    <RiDeleteBin6Fill className='icon' /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className='popup-content'>
          <button className="close-button" onClick={() => {
            setButtonPopup(false); setEditProductIndex(null); setFormData({
              name: '',
              category: '',
              price: '',
              quantity: '',
              description: '',
              image: null
            });
          }}>
            &times;
          </button>
          <div className="popup-heading">
            <h3>{editProductIndex !== null ? 'Update Product' : 'Add New Product'}</h3>
          </div>
          <form onSubmit={handleAddOrUpdateProduct}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter product name" required />
            </label>
            <label>
              Category:
              <select name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                <option value="Vegetable Plants">Vegetable Plants</option>
                <option value="Fruit Plants">Fruit Plants</option>
                <option value="Flower Plants">Flower Plants</option>
                <option value="Decorative Plants">Decorative Plants</option>
                <option value="Vegetable Seeds">Vegetable Seeds</option>
                <option value="Fruit Seeds">Fruit Seeds</option>
                <option value="Herb Seeds">Herb Seeds</option>
                <option value="Organic Fertilizers">Organic Fertilizers</option>
                <option value="Complete Fertilizers">Complete Fertilizers</option>
                <option value="Micronutrient Fertilizers">Micronutrient Fertilizers</option>
              </select>
            </label>
            <label>
              Price:
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter product price" required />
            </label>
            <label>
              Quantity:
              <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Enter product quantity" required />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter product description" required />
            </label>
            <label>
              Image:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.image &&
                <img
                  src={formData.image.url}
                  alt="Image Preview"
                  style={{ maxWidth: '200px', height: '100px' }}
                  className='image-preview'
                />
              }
            </label>
            <div className="button-container">
              <button type="submit" className="add-button">
                {editProductIndex !== null ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default ProductDetails;
