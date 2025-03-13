import { useCallback, useContext, useEffect, useState } from "react";

import { Alert, Snackbar } from "@mui/material";

import { AuthContext } from "../context/contexts";
import Loader from "../components/Loader";
import deleteIcon from "/assets/delete.svg";
import {
  deleteBasketItem,
  fetchData,
  incrementBasket,
  orderCart,
} from "../api/http";

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
        const userCart = await fetchData("/api/basket");
        const groupedCart = groupCartItems(userCart.items);
        setCart({ ...userCart, items: groupedCart });
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
      await orderCart();
      setCart([]);
    } catch (error) {
      setError(error.message || "Hiba történt a kosár betöltése során");
    }
  };

  const handleIncrementItem = async (item) => {
    try {
      const userCart = await incrementBasket(user.id, item);
      const groupedCart = groupCartItems(userCart.items);
      setCart({ ...userCart, items: groupedCart });
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
              <div className="cart__img-container">
                <img src={item.menu_item.image_path} />
              </div>
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
                  <small className="plus">
                    + {extra.ingredient.name} (+ {extra.ingredient.extra_price}
                    Ft)
                  </small>
                ) : (
                  <small className="minus"> - {extra.ingredient.name}</small>
                )}
              </div>
            ))}
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
