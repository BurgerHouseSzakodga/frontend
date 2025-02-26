import { useEffect, useState } from "react";

import { apiClient } from "../api/axios";
import Loader from "../components/Loader";
import { deleteBasketItem } from "../api/http";

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
        setError(error.message || "Hiba történt a kosár betöltése során");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handldeDeleteExtra = (extraQuantity, extraPrice) => {
    console.log(extraQuantity, extraPrice);
  };

  const handleDeleteCartItem = async (id) => {
    try {
      const response = await deleteBasketItem(id);
      setCart(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderCart = async () => {
    try {
      await apiClient.post("/api/order-basket");
      setCart([]);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!cart || !cart.items || !cart.items?.length) {
    return <div>A kosarad üres</div>;
  }

  return (
    <div className="cart">
      {cart.items.map((item) => (
        <details key={item.id}>
          <summary>
            {item.menu_item.name + " - " + item.buying_price + " Ft"}
          </summary>
          <button onClick={() => handleDeleteCartItem(item.id)}>
            Tétel törlése
          </button>
          {item.extras.map((extra) => (
            <div className="cart__extras" key={extra.id}>
              <div>
                {extra.ingredient.name} (+ {extra.ingredient.extra_price}
                Ft)
              </div>
              <button
                onClick={() =>
                  handldeDeleteExtra(
                    extra.quantity,
                    extra.ingredient.extra_price
                  )
                }
              >
                x
              </button>
            </div>
          ))}
        </details>
      ))}
      <div>
        <h2>Teljes összeg:</h2>
        <strong>{cart.total_amount} Ft</strong>
        <button onClick={handleOrderCart}>Megrendelés</button>
      </div>
    </div>
  );
};

export default Cart;
