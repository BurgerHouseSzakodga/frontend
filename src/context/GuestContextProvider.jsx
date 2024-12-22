import { useEffect, useState } from "react";
import { GuestContext } from "./contexts";
import { fetchCategories, fetchMenuItems } from "../api/http";

const GuestContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const menuItemsData = await fetchMenuItems();
        const categoriesData = await fetchCategories();

        setMenuItems(menuItemsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <GuestContext.Provider value={{ menuItems, categories, setMenuItems }}>
      {children}
    </GuestContext.Provider>
  );
};

export default GuestContextProvider;
