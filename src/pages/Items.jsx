// filepath: /c:/Users/Lajkó Gege/Documents/SzakDogaNeTöröld!!!!!!/frontend/src/pages/Items.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Items = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch menu items from the API
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/menu-items');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleInputChange = (itemId, field, value) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [itemId]: {
        ...prevOrder[itemId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/order', order);
      setSuccessMessage('Order placed successfully!');
      setError('');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="items">
      <h2>Menu Items</h2>
      <form onSubmit={handleSubmit}>
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <div>
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                name={`quantity-${item.id}`}
                value={order[item.id]?.quantity || ''}
                onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`customizations-${item.id}`}>Customizations:</label>
              <input
                type="text"
                id={`customizations-${item.id}`}
                name={`customizations-${item.id}`}
                value={order[item.id]?.customizations || ''}
                onChange={(e) => handleInputChange(item.id, 'customizations', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`additionalRequests-${item.id}`}>Additional Requests:</label>
              <input
                type="text"
                id={`additionalRequests-${item.id}`}
                name={`additionalRequests-${item.id}`}
                value={order[item.id]?.additionalRequests || ''}
                onChange={(e) => handleInputChange(item.id, 'additionalRequests', e.target.value)}
              />
            </div>
          </div>
        ))}
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Items;