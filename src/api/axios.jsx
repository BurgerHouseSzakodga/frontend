import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/", // Győződj meg róla, hogy a helyes URL-t használod
  withCredentials: true, // Cookie-k kezelése
});

apiClient.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];
    if (token) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token); // XSRF token hozzáadása
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);
