import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import CategoryContextProvider from "./context/CategoryContextProvider.jsx";
import MenuItemContextProvider from "./context/MenuItemContextProvider.jsx";
import "./sass/index.scss";
import OrderContextProivder from "./context/OrderContextProivder.jsx";
import IngredientContextProvider from "./context/IngredientContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <IngredientContextProvider>
            <MenuItemContextProvider>
              <CategoryContextProvider>
                <OrderContextProivder>
                  <App />
                </OrderContextProivder>
              </CategoryContextProvider>
            </MenuItemContextProvider>
          </IngredientContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
