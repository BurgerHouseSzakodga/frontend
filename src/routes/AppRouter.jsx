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
import ManageOrders from "../pages/ManageOrders";
import Statistics from "../pages/Statistics";
import Item from "../pages/Item";
import AboutYou from "../pages/AboutYou";
import ContactUs from "../pages/ContactUs";
import Service from "../pages/Service";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="/rendeles" element={<Order />} />
        <Route path="/felhasznalo" element={<User />} />
        <Route path="/kosar" element={<Cart />} />
        <Route path="/item/:id" element={<Item />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin/kezelofelulet" element={<Dashboard />} />
          <Route path="/admin/etelek-kezelese" element={<ManageMenuItems />} />
          <Route path="/admin/rendelesek-kezelese" element={<ManageOrders />} />
          <Route path="/admin/statisztikak" element={<Statistics />} />
          

        </Route>
      </Route>
      <Route element={<GuestLayout />}>
        <Route path="/bejelentkezes" element={<Login />} />
        <Route path="/regisztracio" element={<Register />} />
        
      </Route>
      <Route path="*" element={<NoPage />} />
      <Route path="/rolunk" element={<AboutYou />} />
      <Route path="/kapcsolat" element={<ContactUs />} />
      <Route path="/szolgaltatas" element={<Service/>} />
    </Routes>
  );
};

export default AppRouter;
