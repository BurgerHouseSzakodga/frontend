import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import AdminContextProvider from "./context/AdminContextProvider.jsx";
import "./sass/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
