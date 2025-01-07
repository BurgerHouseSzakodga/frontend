import { useEffect, useState } from "react";
import { CategoryContext } from "./contexts";
import { fetchCategories } from "../api/http";

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setCategoriesLoading(true);
      try {
        const categoriesData = await fetchCategories();

        setCategories(categoriesData);
      } catch (error) {
        setCategoriesError(
          error.message.data.message ||
            "Hiba történt a kategóriák betöltése során."
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, categoriesError, categoriesLoading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
