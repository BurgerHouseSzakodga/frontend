import { useEffect, useState } from "react";

import { apiClient } from "../api/axios";
import Loader from "../components/Loader";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/api/basket");
        setCart(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!cart || !cart.items) {
    return <div>A kosarad üres</div>;
  }

  return (
    <div className="cart">
      {cart.items.map((item) => (
        <div key={item.id}>
          <h3>{item.menu_item.name}</h3>
          <p>Ár: {item.menu_item.price} Ft</p>
          {item.extras.length > 0 && (
            <div>
              <h4>Összetevők:</h4>
              {item.extras.map((extra) => (
                <div key={extra.id}>
                  {extra.ingredient.name} (Mennyiség: {extra.quantity})
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cart;
