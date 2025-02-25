import { apiClient } from "./axios";

// Guest hívások

export const fetchData = async (path) => {
  const response = await apiClient.get(path);
  return response.data;
};

// Auth hívások

const csrf = () => apiClient.get("/sanctum/csrf-cookie");

export const authenticateUser = async (path, payload) => {
  await csrf();
  await apiClient.post(path, payload);
};

export const logoutUser = async () => {
  await apiClient.post("/logout");
};

// Admin hívások

export const fetchRevenueByTimePeriod = async (days) => {
  const response = await apiClient.get(`api/revenue-by-days/${days}`);
  return response.data[0];
};

export const updateIsAdmin = async (userId, isAdmin) => {
  const response = await apiClient.put(`api/users/${userId}`, {
    is_admin: isAdmin,
  });
  return response.data.user;
};

export const deleteUser = async (userId) => {
  await apiClient.delete(`api/users/${userId}`);
};

export const updateMenuItem = async ({ property, menuItemId, value }) => {
  const propertyMap = {
    name: "name",
    price: "price",
    category: "category_id",
    description: "description",
    composition: "composition",
  };

  const url = `api/menu-items/${menuItemId}/${property}`;
  const payload = { [propertyMap[property]]: value };

  const response = await apiClient.put(url, payload);
  return response.data.menuItem;
};

export const updateMenuItemImage = async (menuItemId, image) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await apiClient.post(
    `api/menu-items/${menuItemId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.menuItem;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await apiClient.put(`api/orders/${orderId}/status`, {
    status,
  });
  return response.data.order;
};

export const createMenuItem = async (payload) => {
  const response = await apiClient.post(`api/menu-items`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.menuItem;
};

export const deleteMenuItem = async (menuItemId) => {
  await apiClient.delete(`api/menu-items/${menuItemId}`);
};

export const deleteDiscount = async (id) => {
  await apiClient.delete(`api/discounts/${id}`);
};

export const createDiscount = async (id, discountAmount) => {
  const response = await apiClient.post(`api/discounts/${id}`, {
    discount_amount: discountAmount,
  });

  return response.data.discount;
};

export const updateDiscountAmount = async (id, discountAmount) => {
  const response = await apiClient.put(`api/discounts/${id}`, {
    discount_amount: discountAmount,
  });

  return response.data.menuItem;
};

export const addToBasket = async (userId, menuItem) => {
  const response = await apiClient.post(`api/add-to-basket`, {
    user_id: userId,
    item_id: menuItem.id,
    name: menuItem.name,
    description: menuItem.description,
    image_path: menuItem.image_path,
    price: menuItem.price,
    actual_price: menuItem.actual_price,
    discount_amount: menuItem.discount_amount,
    category_id: menuItem.category_id,
    category_name: menuItem.category_name,
    compositions: menuItem.compositions.map((composition) => ({
      ingredient_id: composition.ingredient_id,
      ingredient_name: composition.ingredient_name,
      extra_price: composition.extra_price,
      quantity: composition.quantity,
    })),
  });

  return response.data;
};

export const deleteBasketItem = async (id) => {
  await apiClient.delete(`api/delete-basket-item/${id}`);
};
