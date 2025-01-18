import { useEffect, useState } from "react";

import { MenuItemContext } from "./contexts";
import {
  createMenuItem,
  updateMenuItemCategory,
  deleteMenuItem,
  updateMenuItemName,
  updateMenuItemPrice,
  fetchData,
  updateMenuItemDescription,
  updateMenuItemComposition,
  updateMenuItemImage,
} from "../api/http";

const MenuItemContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemError, setMenuItemError] = useState(null);
  const [menuItemLoading, setMenuItemLoading] = useState(false);

  useEffect(() => {
    const getMenuItems = async () => {
      setMenuItemLoading(true);
      try {
        const menuItemsData = await fetchData("api/menu-items");
        setMenuItems(menuItemsData);
      } catch (error) {
        setMenuItemError(
          error.message.data.message ||
            "Hiba történt az ételek betöltése során."
        );
      } finally {
        setMenuItemLoading(false);
      }
    };

    getMenuItems();
  }, []);

  const handleUpdateMenuItemName = async (menuItemId, name) => {
    setMenuItemLoading(true);
    try {
      const updatedMenuItem = await updateMenuItemName(menuItemId, name);
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setMenuItemError(
        error.message.data.message || "Hiba történt a frissítés során."
      );
    } finally {
      setMenuItemLoading(false);
    }
  };

  const handleUpdateMenuItemPrice = async (menuItemId, price) => {
    setMenuItemLoading(true);
    try {
      const updatedMenuItem = await updateMenuItemPrice(menuItemId, price);
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setMenuItemError(
        error.response.data.message || "Hiba történt a frissítés során."
      );
    } finally {
      setMenuItemLoading(false);
    }
  };

  const handleUpdateMenuItemCategory = async (menuItemId, categoryId) => {
    setMenuItemLoading(true);
    try {
      const updatedMenuItem = await updateMenuItemCategory(
        menuItemId,
        categoryId
      );
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setMenuItemError(
        error.response.data.message || "Hiba történt a frissítés során."
      );
    } finally {
      setMenuItemLoading(false);
    }
  };

  const handleUpdateMenuItemDescription = async (menuItemId, description) => {
    setMenuItemLoading(true);
    try {
      const updatedMenuItem = await updateMenuItemDescription(
        menuItemId,
        description
      );
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setMenuItemError(
        error.response.data.message || "Hiba történt a frissítés során."
      );
    } finally {
      setMenuItemLoading(false);
    }
  };

  const handleUpdateMenuItemComposition = async (menuItemId, composition) => {
    setMenuItemLoading(true);
    try {
      const updatedMenuItem = await updateMenuItemComposition(
        menuItemId,
        composition
      );
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setMenuItemError(
        error.response.data.message || "Hiba történt a frissítés során."
      );
    } finally {
      setMenuItemLoading(false);
    }
  };

  const handleUpdateMenuItemImage = async (menuItemId, image) => {
    setMenuItemLoading(true);
    try {
      const updatedMenuItem = await updateMenuItemImage(menuItemId, image);
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.id === menuItemId ? updatedMenuItem : item
        )
      );
    } catch (error) {
      setMenuItemError(
        error.response.data.message || "Hiba történt a frissítés során."
      );
    } finally {
      setMenuItemLoading(false);
    }
  };

  const handleCreateMenuItem = async (payload) => {
    setMenuItemLoading(true);
    try {
      const newMenuItem = await createMenuItem(payload);
      setMenuItems((prevMenuItems) => [...prevMenuItems, newMenuItem]);
      return true;
    } catch (error) {
      setMenuItemError(
        error.response.data.message || "Hiba történt a létrehozás során."
      );
      return false;
    } finally {
      setMenuItemLoading(false);
    }
  };

  const handleDeleteMenuItem = async (menuItemId) => {
    setMenuItemLoading(true);
    try {
      await deleteMenuItem(menuItemId);
      setMenuItems((prevMenuItems) =>
        prevMenuItems.filter((item) => item.id !== menuItemId)
      );
    } catch (error) {
      setMenuItemError(
        error.response.data.message || "Hiba történt a törlés során."
      );
    } finally {
      setMenuItemLoading(false);
    }
  };

  const ctxValue = {
    menuItems,
    menuItemError,
    menuItemLoading,
    setMenuItemError,
    handleCreateMenuItem,
    handleUpdateMenuItemCategory,
    handleDeleteMenuItem,
    handleUpdateMenuItemName,
    handleUpdateMenuItemPrice,
    handleUpdateMenuItemDescription,
    handleUpdateMenuItemComposition,
    handleUpdateMenuItemImage,
  };

  return (
    <MenuItemContext.Provider value={ctxValue}>
      {children}
    </MenuItemContext.Provider>
  );
};

export default MenuItemContextProvider;
