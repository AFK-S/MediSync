import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavigation.css";
import { useNavigate } from "react-router-dom";

const SideNavigation = () => {
  const navs = [
    {
      name: "Dashboard",
      path: "/",
      icon: "fa-solid fa-user",
    },
    {
      name: "Register",
      path: "/register",
      icon: "fa-solid fa-user",
    },
    {
      name: "Hospital List",
      path: "/hospitals",
      icon: "fa-solid fa-user",
    },
  ];

  return (
    <div className="navigation rounded p-3 d-flex flex-column">
      <div style={{ overflow: "auto" }}>
        {navs.map((e) => {
          const { name, path, icon } = e;
          return (
            <NavLink to={path} className="navlink my-2 rounded-s">
              <i className={`me-2 ms-2 ${icon}`}></i>
              <p>{name}</p>
            </NavLink>
          );
        })}
      </div>

      <div>
        <div className="divider my-3"></div>

        <button
          className="logout-btn flexbox px-3 p-2 w-100 rounded-s"
          // onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket me-2 ms-2"></i>
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default SideNavigation;
