import React from "react";
import { NavLink } from "react-router-dom";
const Menu = () => {
  let activeStyle = {
    color: `rgb(33, 43, 54)`,
    backgroundColor: `rgba(145, 158, 171, 0.16)`,
    fontWeight: "bold",
  };
  let noneActiveStyle = {
    color: `rgb(99, 115, 129)`,
  };

  return (
    <>
      <div className="d-none d-md-block">
        <NavLink
          to="dashboard"
          className="d-flex gap-3 align-items-center text-decoration-none p-3 rounded-2  "
          style={({ isActive }) => (isActive ? activeStyle : noneActiveStyle)}>
          <i className="bi bi-bar-chart flex-shrink-1"></i>
          <p className="m-0  d-none d-xl-block">Dashboard</p>
        </NavLink>

        <NavLink
          to="users"
          className="d-flex gap-3 align-items-center text-decoration-none p-3 rounded-2 "
          style={({ isActive }) => (isActive ? activeStyle : noneActiveStyle)}>
          <i className="bi bi-people flex-shrink-1"></i>
          <p className="m-0  d-none d-xl-block">Users</p>
        </NavLink>

        <NavLink
          to="products"
          className="d-flex gap-3 align-items-center text-decoration-none p-3 rounded-2 "
          style={({ isActive }) => (isActive ? activeStyle : noneActiveStyle)}>
          <i className="bi bi-journal-text flex-shrink-1"></i>
          <p className="m-0  d-none d-xl-block">Products</p>
        </NavLink>
        <NavLink
          to="borrowreturn"
          className="d-flex gap-3 align-items-center text-decoration-none p-3 rounded-2"
          style={({ isActive }) => (isActive ? activeStyle : noneActiveStyle)}>
          <i className="bi bi-basket flex-shrink-1"></i>
          <p className="m-0  d-none d-xl-block">Borrow/Return</p>
        </NavLink>
      </div>
    </>
  );
};

export default Menu;
