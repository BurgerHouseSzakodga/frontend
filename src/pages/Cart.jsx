import { useCallback, useContext, useEffect, useState } from "react";

import { Alert, Snackbar } from "@mui/material";

import { apiClient } from "../api/axios";
import { deleteBasketItem, incrementBasket } from "../api/http";
import { AuthContext } from "../context/contexts";
import Loader from "../components/Loader";
import deleteIcon from "/assets/delete.svg";
//import { Alert, Snackbar } from "@mui/material";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);

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
    items.sort((a, b) => {
      if (a.item_id !== b.item_id) {
        return a.item_id - b.item_id;
      }
      return JSON.stringify(a.extras).localeCompare(JSON.stringify(b.extras));
    });

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

  const handleDeleteCartItem = async (id) => {
    try {
      const response = await deleteBasketItem(id);
      const groupedCart = groupCartItems(response.items);
      setCart({ ...response, items: groupedCart });
    } catch (error) {
      setError(error.message || "Hiba történt a kosár betöltése során");
    }
  };

  const handleOrderCart = async () => {
    try {
      await apiClient.post("/api/order-basket");
      setCart([]);
    } catch (error) {
      setError(error.message || "Hiba történt a kosár betöltése során");
    }
  };

  const handleIncrementItem = async (item) => {
    try {
      const response = await incrementBasket(user.id, item);
      const groupedCart = groupCartItems(response.items);
      setCart({ ...response, items: groupedCart });
    } catch (error) {
      setError(error.message || "Hiba történt a kosár betöltése során");
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!cart || !cart.items || !cart.items.length) {
    return <div>A kosarad üres</div>;
  }

  return (
    <>
      <div className="cart">
        {cart.items.map((item) => (
          <div key={item.id}>
            <div className="cart__item">
              <h4>
                {item.menu_item.name} - {item.buying_price} Ft
              </h4>
              <div className="item-quantity">
                <button onClick={() => handleDeleteCartItem(item.id)}>
                  {item.quantity === 1 ? <img src={deleteIcon} /> : "-"}
                </button>
                <span> {item.quantity}</span>
                <button
                  disabled={item.quantity === 5}
                  onClick={() => handleIncrementItem(item)}
                >
                  +
                </button>
              </div>
            </div>
            {item.extras.map((extra) => (
              <div className="cart__extras" key={extra.id}>
                {extra.quantity > 1 ? (
                  <small>
                    + {extra.ingredient.name} (+ {extra.ingredient.extra_price}
                    Ft)
                  </small>
                ) : (
                  <small> - {extra.ingredient.name}</small>
                )}
              </div>
            ))}
            <hr />
          </div>
        ))}
        <div>
          <h2>Teljes összeg:</h2>
          <strong>{cart.total_amount} Ft</strong>
          <button onClick={handleOrderCart}>Megrendelés</button>
        </div>
      </div>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Hiba a kosárhoz adás során.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
