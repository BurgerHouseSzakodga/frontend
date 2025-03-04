import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../api/axios";
import Loader from "../components/Loader";
import { deleteBasketItem } from "../api/http";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (
        a[i].ingredient.id !== b[i].ingredient.id ||
        a[i].quantity !== b[i].quantity
      ) {
        return false;
      }
    }
    return true;
  };

  const groupCartItems = useCallback((items) => {
    const grouped = items.reduce((acc, item) => {
      const existingItem = acc.find(
        (i) => i.item_id === item.item_id && arraysEqual(i.extras, item.extras)
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    return grouped;
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/api/basket");
        console.log(response.data);
        const groupedCart = groupCartItems(response.data.items);
        setCart({ ...response.data, items: groupedCart });
      } catch (error) {
        setError(error.message || "Hiba történt a kosár betöltése során");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [groupCartItems]);

  const handldeDeleteExtra = (extraQuantity, extraPrice) => {
    console.log(extraQuantity, extraPrice);
  };

  const handleDeleteCartItem = async (id) => {
    try {
      const response = await deleteBasketItem(id);
      const groupedCart = groupCartItems(response.items);
      setCart({ ...response, items: groupedCart });
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

  if (!cart || !cart.items || !cart.items.length) {
    return <div>A kosarad üres</div>;
  }

  return (
    <div className="cart">
      {cart.items.map((item) => (
        <details key={item.id}>
          <summary>
            {item.menu_item.name} - {item.buying_price} Ft x {item.quantity}
          </summary>
          <button onClick={() => handleDeleteCartItem(item.id)}>
            Tétel törlése
          </button>
          {item.extras.map((extra) => (
            <div className="cart__extras" key={extra.id}>
              <div>
                {extra.ingredient.name} (+ {extra.ingredient.extra_price} Ft)
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
