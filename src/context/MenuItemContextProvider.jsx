import { useEffect, useState } from "react";

import { MenuItemContext } from "./contexts";
import {
  fetchData,
  updateMenuItem,
  createMenuItem,
  deleteMenuItem,
  updateMenuItemImage,
  createDiscount,
} from "../api/http";

const MenuItemContextProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [menuItemError, setMenuItemError] = useState(null);
  const [menuItemLoading, setMenuItemLoading] = useState(false);

  useEffect(() => {
    const getMenuItems = async () => {
      setMenuItemLoading(true);
      try {
        const menuItemsData = await fetchData("api/menu-items");
        const discountsData = await fetchData("api/discounts");

        setMenuItems(menuItemsData);
        setDiscounts(discountsData);
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
      const updateRequestData = {
        property: "name",
        menuItemId,
        value: name,
      };

      const updatedMenuItem = await updateMenuItem(updateRequestData);
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
      const updateRequestData = {
        property: "price",
        menuItemId,
        value: price,
      };

      const updatedMenuItem = await updateMenuItem(updateRequestData);
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
      const updateRequestData = {
        property: "category",
        menuItemId,
        value: categoryId,
      };

      const updatedMenuItem = await updateMenuItem(updateRequestData);
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
      const updateRequestData = {
        property: "description",
        menuItemId,
        value: description,
      };
      const updatedMenuItem = await updateMenuItem(updateRequestData);
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
      const updateRequestData = {
        property: "composition",
        menuItemId,
        value: composition,
      };

      const updatedMenuItem = await updateMenuItem(updateRequestData);
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
      setMenuItems(menuItems);
      setMenuItemError(
        error.response.data.message || "Hiba történt a törlés során."
      );
    } finally {
      setMenuItemLoading(false);
    }
  };

  const handleCreateDiscount = async (menuItemId, discountAmount) => {
    try {
      await createDiscount(menuItemId, discountAmount);
      setDiscounts((prevDescounts) => [
        ...prevDescounts,
        {
          menu_item_id: menuItemId,
          discount_amount: discountAmount,
        },
      ]);
    } catch (error) {
      setDiscounts(discounts);
      setMenuItemError(
        error.response.data.message || "Hiba történt a frissítés."
      );
    }
  };

  const ctxValue = {
    menuItems,
    discounts,
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
    handleCreateDiscount,
  };

  return (
    <MenuItemContext.Provider value={ctxValue}>
      {children}
    </MenuItemContext.Provider>
  );
};

export default MenuItemContextProvider;
