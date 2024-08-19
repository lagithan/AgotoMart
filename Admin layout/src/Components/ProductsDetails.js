import React, { useState } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import Popup from './Popup';
import './productdetails.css';

const ProductDetails = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Tomato Seeds',
      category: 'Vegetable Seeds',
      price: '$10',
      quantity: '100',
      description: 'High-quality tomato seeds for better yield.',
      image: '' 
    },
    {
      id: 2,
      name: 'Organic Fertilizer',
      category: 'Organic',
      price: '$25',
      quantity: '50',
      description: 'Nutrient-rich fertilizer for organic gardening.',
      image: ''
    }
  ]);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    image: null // Image file
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    if (editProductIndex !== null) {
      const updatedProducts = products.map((product, index) =>
        index === editProductIndex ? { ...formData, id: products[index].id } : product
      );
      setProducts(updatedProducts);
      setEditProductIndex(null);
    } else {
      setProducts([...products, { ...formData, id: products.length + 1 }]);
    }
    setFormData({
      id: '',
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: '',
      image: null
    });
    setButtonPopup(false);
  };

  const handleEditClick = (index) => {
    setEditProductIndex(index);
    setFormData(products[index]);
    setButtonPopup(true);
  };

  const handleDeleteClick = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
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
              <tr key={product.id}>
                <td>{product.id}</td>
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
          <button className="close-button" onClick={() => setButtonPopup(false)}>
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
                <option value="Organic Fertlizers">Organic  Fertlizers</option>
                <option value="Complete  Fertlizers">Complete  Fertlizers</option>
                <option value="Micronutrient  Fertlizers">Micronutrient  Fertlizers</option>
              </select>
            </label>
            <label>
              Price:
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter product price" required />
            </label>
            <label>
              Quantity:
              <input type="text" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Enter product quantity" required />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter product description" required />
            </label>
            <label>
              Image:
              <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
              {formData.image && 
                <img
                  src={formData.image}
                  style={{ maxWidth: '200px', height: '100px' }}
                  alt="Preview"
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
}

export default ProductDetails;
