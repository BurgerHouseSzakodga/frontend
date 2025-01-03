import { Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import GuestLayout from "../layouts/GuestLayout";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Order from "../pages/Order";
import User from "../pages/User";
import NoPage from "../pages/NoPage";
import Cart from "../pages/Cart";
import Dashboard from "../pages/Dashboard";
import ManageMenuItems from "../pages/ManageMenuItems";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="/rendeles" element={<Order />} />
        <Route path="/felhasznalo" element={<User />} />
        <Route path="/kosar" element={<Cart />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/kezelofelulet" element={<Dashboard />} />
          <Route path="/admin/etelek-kezelese" element={<ManageMenuItems />} />
        </Route>
      </Route>
      <Route element={<GuestLayout />}>
        <Route path="/bejelentkezes" element={<Login />} />
        <Route path="/regisztracio" element={<Register />} />
      </Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default AppRouter;
