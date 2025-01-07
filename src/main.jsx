import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import CategoryContextProvider from "./context/CategoryContextProvider.jsx";
import MenuItemContextProvider from "./context/MenuItemContextProvider.jsx";
import "./sass/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <MenuItemContextProvider>
              <App />
            </MenuItemContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </CategoryContextProvider>
    </BrowserRouter>
  </StrictMode>
);
