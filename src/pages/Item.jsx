import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert, Snackbar } from "@mui/material";

import Loader from "../components/Loader";
import { AuthContext, UserContext } from "../context/contexts";
import { addToBasket, fetchData } from "../api/http";

function Item() {
  const { id } = useParams();
  const { navigate, user } = useContext(AuthContext);
  const { hasActiveOrder } = useContext(UserContext);

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const menuItem = await fetchData(`api/menu-item/${id}`);
        setItem(menuItem);
      } catch (error) {
        setError(error.message || "Hiba a betöltés során");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    getItem();
  }, [id, navigate]);

  const handleChangeQuantity = (id, value) => {
    const newCompositions = [...item.compositions];
    const ingredient = newCompositions.find(
      (comp) => comp.ingredient_id === id
    );

    let actual_price = item.actual_price;

    if (ingredient.quantity < value && value > 1) {
      actual_price += ingredient.extra_price;
    } else if (ingredient.quantity > value && ingredient.quantity > 1) {
      actual_price -= ingredient.extra_price;
    }

    ingredient.quantity = value;

    setItem((prevItem) => ({
      ...prevItem,
      actual_price,
      compositions: [...newCompositions],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addToBasket(user.id, item);
      setOpen(true);
    } catch (error) {
      setError(error.message || "Hiba a kosárhoz adás során");
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setError(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (hasActiveOrder) {
    navigate("/kosar");
  }

  return (
    <>
      <div className="item-details">
        <div className="item-header">
          <img src={item.image_path} alt={item.name} />
          <div className="item-info">
            <h1>{item.name}</h1>
            <p className="description">{item.description}</p>
            <p className="price">{item.actual_price} Ft</p>
          </div>
        </div>
        <div className="ingredients-section">
          <h2>Összetevők:</h2>
          <form onSubmit={handleSubmit}>
            {item.compositions ? (
              <div className="ingredients-list">
                {item.compositions.map((ingredient) => (
                  <span key={ingredient.ingredient_id} className="ingredient">
                    <input
                      type="number"
                      value={ingredient.quantity}
                      name={ingredient.ingredient_name}
                      onChange={(e) =>
                        handleChangeQuantity(
                          ingredient.ingredient_id,
                          e.target.value
                        )
                      }
                      min="0"
                      max="2"
                    />
                    {ingredient.ingredient_name}
                    {ingredient.extra_price > 0 &&
                      ` (+${ingredient.extra_price} Ft)`}
                  </span>
                ))}
              </div>
            ) : (
              <p>Nincsenek elérhető összetevők</p>
            )}
            <div className="total-price">
              <h3>Teljes ár: {item.actual_price} Ft</h3>
            </div>
            <button type="submit">Rendelés</button>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Étel sikeresen kosárhoz adva
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Item;
