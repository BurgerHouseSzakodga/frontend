import { useEffect, useState } from "react";
import { CategoryContext } from "./contexts";
import { fetchData } from "../api/http";

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setCategoriesLoading(true);
      try {
        const categoriesData = await fetchData("api/categories");

        setCategories(categoriesData);
      } catch (error) {
        setCategoriesError(
          "Hiba történt a kategóriák betöltése során.",
          error.message
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
