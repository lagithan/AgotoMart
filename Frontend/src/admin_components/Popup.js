import React from 'react';
import './popup.css';

const Popup = ({ trigger, setTrigger, children }) => {
  return trigger ? (
    <div className="popup">
        
        {children}
    </div>
  ) : "";
};

export default Popup;
