import { apiClient } from "./axios";

// Guest hívások

export const fetchMenuItems = async () => {
  const { data } = await apiClient.get("api/menu-items");
  return data;
};

export const fetchCategories = async () => {
  const { data } = await apiClient.get("api/categories");
  return data;
};

// Auth hívások

const csrf = () => apiClient.get("/sanctum/csrf-cookie");

export const fetchUser = async () => {
  const { data } = await apiClient.get("api/user");
  return data;
};

export const loginUser = async (payload) => {
  await csrf();
  await apiClient.post("/login", payload);
};

export const registerUser = async (payload) => {
  await csrf();
  await apiClient.post("/register", payload);
};

export const logoutUser = async () => {
  await apiClient.post("/logout");
};

// Admin hívások

export const fetchAdminData = async () => {
  const [
    usersResponse,
    userNumberResponse,
    ordersResponse,
    revenueResponse,
    pendingOrdersResponse,
    ingredientsResponse,
  ] = await Promise.all([
    apiClient.get("api/users"),
    apiClient.get("api/number-of-users"),
    apiClient.get("api/number-of-orders"),
    apiClient.get("api/total-revenue"),
    apiClient.get("api/pending-orders"),
    apiClient.get("api/ingredients"),
  ]);

  return {
    users: usersResponse.data,
    numberOfUsers: userNumberResponse.data,
    numberOfOrders: ordersResponse.data,
    totalRevenue: revenueResponse.data,
    pendingOrders: pendingOrdersResponse.data,
    ingredients: ingredientsResponse.data,
  };
};

export const fetchRevenueChartData = async (days) => {
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

export const updateMenuItemName = async (menuItemId, name) => {
  const response = await apiClient.put(`api/menu-items/${menuItemId}/name`, {
    name,
  });
  return response.data.menuItem;
};

export const updateMenuItemPrice = async (menuItemId, price) => {
  const response = await apiClient.put(`api/menu-items/${menuItemId}/price`, {
    price,
  });
  return response.data.menuItem;
};

export const updateMenuItemCategory = async (menuItemId, categoryId) => {
  const response = await apiClient.put(
    `api/menu-items/${menuItemId}/category`,
    {
      category_id: categoryId,
    }
  );
  return response.data.menuItem;
};

export const createMenuItem = async (payload) => {
  console.log(payload);
  const response = await apiClient.post(`api/menu-items`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.menuItem;
};
