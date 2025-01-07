import { useEffect, useState } from "react";
import { IngredientContext } from "./contexts";
import { fetchData } from "../api/http";

const IngredientContextProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientError, setIngredientError] = useState("");
  const [ingredientLoading, setIngredientLoading] = useState(false);

  useEffect(() => {
    const getIngredients = async () => {
      setIngredientLoading(true);
      try {
        const ingredientsData = await fetchData("api/ingredients");
        setIngredients(ingredientsData);
      } catch (error) {
        setIngredientError(
          error.message.data.message ||
            "Hiba történt az összetevők betöltése során."
        );
      } finally {
        setIngredientLoading(false);
      }
    };

    getIngredients();
  }, []);

  const ctxValue = {
    ingredients,
    ingredientError,
    ingredientLoading,
  };

  return (
    <IngredientContext.Provider value={ctxValue}>
      {children}
    </IngredientContext.Provider>
  );
};

export default IngredientContextProvider;
