import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavigation.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../slice/AdminSlice.js";
import { useCookies } from "react-cookie";

const SideNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token", "userId"]);
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("userId");
    dispatch(logoutAdmin());
    window.location.href = "/login";
  };

  const navs = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "fa-solid fa-user",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "fa-solid fa-user",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-user",
    },
    {
      name: "Patients",
      path: "/patients",
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
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket me-2 ms-2"></i>
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default SideNavigation;
