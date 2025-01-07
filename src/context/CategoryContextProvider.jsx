import { useEffect, useState } from "react";
import { CategoryContext } from "./contexts";
import { fetchCategories } from "../api/http";

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const categoriesData = await fetchCategories();

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
