import React, { useState } from 'react';
import './popup.css';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';

const Orderdes = ({ item,setselectitem }) => {
  const [quantity, setQuantity] = useState(1);
  const generateStockRange = (maxStock) => {
    return Array.from({ length: maxStock }, (_, i) => i + 1);
  };
  const stockRange = generateStockRange(item.stock);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleclose=()=>{
      setselectitem({});
  }

  return (
    <div className='back-drop'>
      <div className='order-popup'>
        <img className='desc-img' src={item.image} alt="Tomato plant" />
        <div className='popup-content'>
            <CloseIcon fontSize='large' className='pop-close-btn' onClick={handleclose}/>
          <h2 className='popup-h'>{item.name}</h2>
          <h3 style={{ fontSize: '24px', fontFamily: 'poppins' }}>Description</h3>
          <p style={{ fontSize: '15px', height: '150px' }}>
            Tomato plants are a popular choice for home gardeners, known for their juicy and flavorful fruits. They are easy to grow and provide a bountiful harvest. Ideal for salads, sauces, and fresh snacking, tomato plants thrive in sunny locations with well-drained soil.
          </p>
          <h4 style={{ color: 'green', fontFamily: 'poppins', fontWeight: '500', marginTop: '10px' }}>Available</h4>
          <FormControl sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id="quantity-select-label" sx={{ display: 'none' }}>Quantity</InputLabel>
            <Select className='number-input'
              value={quantity}
              onChange={handleChange}
              sx={{
                height: 35,
                '.MuiSelect-select': {
                  padding: '0 14px', 
                },
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none', 
                },
              }}
            >
              {stockRange.map((num) => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <h3 style={{ fontSize: '24px', fontFamily: 'poppins', marginTop: '10px', lineHeight: '1' }}>
            Rs.{item.price} (1pcs)
          </h3>
          <h2 className='popup-h' style={{ color: 'green', fontSize: '26px', marginTop: '10px' }}>
            Total Rs.{item.price * quantity}
          </h2>
          <div className='popup-btn'>
            <button className='addcart-btn'><ShoppingCartOutlinedIcon fontSize="medium"/> Add to cart</button>
            <button className='buy-btn'><LocalMallOutlinedIcon fontSize="medium"/> Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orderdes;
