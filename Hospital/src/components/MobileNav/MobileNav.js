import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../slice/AdminSlice.js";
import { useCookies } from "react-cookie";
import "./MobileNav.css";

const MobileNav = ({ isMenuOpen, ToggleMenu }) => {
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
    {
      name: "Register Doctor",
      path: "/reg-doc",
      icon: "fa-solid fa-user",
    },
  ];

  return (
    <div className={`mobileNav ${isMenuOpen ? "active" : ""}`}>
      <div
        className="close-btn d-flex align-items-center justify-content-center"
        onClick={ToggleMenu}
        style={{
          width: "40px",
          height: "40px",
          position: "absolute",
          right: "1.8rem",
          top: "1.8rem",
          cursor: "pointer",
          background: "#228be6",
          color: "#fff",
          borderRadius: "10px",
        }}
      >
        <i
          className="fa-solid fa-x"
          style={{
            fontWeight: "900",
            fontSize: "1rem",
          }}
        ></i>
      </div>
      <div className="navigation rounded  px-4 d-flex flex-column">
        <div style={{ overflow: "auto", marginTop: "5rem" }}>
          {navs.map((e, index) => {
            const { name, path, icon } = e;
            return (
              <NavLink
                to={path}
                className="navlink my-2 rounded-s"
                key={index}
                onClick={ToggleMenu}
              >
                <i className={`me-2 ms-2 ${icon}`}></i>
                <p>{name}</p>
              </NavLink>
            );
          })}
        </div>

        <div className="pb-4">
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
    </div>
  );
};

export default MobileNav;
