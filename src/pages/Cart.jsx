import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleClearCart = async () => {
    try {
      await axios.post('/api/cart/clear');
      setCart(null);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (!cart || !cart.items) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.items.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.menu_item.image_path} alt={item.menu_item.name} />
          <div>
            <h3>{item.menu_item.name}</h3>
            <p>Price: {item.menu_item.price} Ft</p>
            <p>Quantity: {item.quantity}</p>
            {item.extras.map((extra) => (
              <div key={extra.id}>
                <p>{extra.ingredient.name}: {extra.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;