import React from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import Dashboard from "./Content/Dashboard";
import Products from "./Content/Products";
import Users from "./Content/Users";
import Layout from "./Layout";
import Login from "./Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import AddUser from "./Content/AddUser";
import UserDetail from "./Content/UserDetail";
import AddProduct from "./Content/AddProduct";
import ProductDetail from "./Content/ProductDetail";

import BorrowReturn from "./Content/BorrowReturn";
const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="home" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="userdetail" element={<UserDetail />}></Route>
            <Route path="products" element={<Products />}></Route>
            <Route path="adduser" element={<AddUser />}></Route>
            <Route path="addproduct" element={<AddProduct />}></Route>
            <Route path="productdetail" element={<ProductDetail />}></Route>
            <Route path="borrowreturn" element={<BorrowReturn />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
