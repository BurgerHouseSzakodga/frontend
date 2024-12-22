import { apiClient } from "./axios";

//guest hívások

export const fetchMenuItems = async () => {
  try {
    const { data } = await apiClient.get("api/menu-items");
    return data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await apiClient.get("api/categories");
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

//auth hívások

const csrf = () => apiClient.get("/sanctum/csrf-cookie");

export const fetchUser = async () => {
  try {
    const { data } = await apiClient.get("api/user");
    return data;
  } catch (error) {
    console.error("No authenticated user:", error);
    throw error;
  }
};

export const loginUser = async (payload) => {
  await csrf();
  try {
    await apiClient.post("/login", payload);
  } catch (error) {
    console.error("Failed to login user:", error);
    throw error;
  }
};

export const registerUser = async (payload) => {
  await csrf();
  try {
    await apiClient.post("/register", payload);
  } catch (error) {
    console.error("Failed to register user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await apiClient.post("/logout");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

//admin hívások

export const fetchAdminData = async () => {
  try {
    const [
      usersResponse,
      userNumberResponse,
      ordersResponse,
      revenueResponse,
      pendingOrdersResponse,
    ] = await Promise.all([
      apiClient.get("api/users"),
      apiClient.get("api/number-of-users"),
      apiClient.get("api/number-of-orders"),
      apiClient.get("api/total-revenue"),
      apiClient.get("api/pending-orders"),
    ]);

    return {
      users: usersResponse.data,
      numberOfUsers: userNumberResponse.data,
      numberOfOrders: ordersResponse.data,
      totalRevenue: revenueResponse.data,
      pendingOrders: pendingOrdersResponse.data,
    };
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};

export const updateIsAdmin = async (userId, isAdmin) => {
  try {
    const response = await apiClient.put(`api/users/${userId}`, {
      is_admin: isAdmin,
    });
    return response.data.user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await apiClient.delete(`api/users/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateMenuItemName = async (menuItemId, name) => {
  try {
    const response = await apiClient.put(`api/menu-items/${menuItemId}/name`, {
      name,
    });
    return response.data.menuItem;
  } catch (error) {
    console.error("Error updating menu item name:", error);
    throw error;
  }
};

export const updateMenuItemPrice = async (menuItemId, price) => {
  try {
    const response = await apiClient.put(`api/menu-items/${menuItemId}/price`, {
      price,
    });
    return response.data.menuItem;
  } catch (error) {
    console.error("Error updating menu item price:", error);
    throw error;
  }
};

export const updateMenuItemCategory = async (menuItemId, categoryId) => {
  try {
    const response = await apiClient.put(
      `api/menu-items/${menuItemId}/category`,
      {
        category_id: categoryId,
      }
    );
    return response.data.menuItem;
  } catch (error) {
    console.error("Error updating menu item category:", error);
    throw error;
  }
};
