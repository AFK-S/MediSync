import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../slice/UserSlice.js";
import { useCookies } from "react-cookie";
import "./MobileNav.css";
import axios from "axios";

const MobileNav = ({ isMenuOpen, ToggleMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token", "userId"]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const navs = [
    {
      name: "Home",
      path: "/home",
      icon: "fa-solid fa-home",
    },
    {
      name: "Search",
      path: "/search",
      icon: "fa-solid fa-search",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-hospital-user",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "fa-solid fa-user",
    },
    {
      name: "Info",
      path: "/info",
      icon: "fa-solid fa-circle-info",
    },
  ];

  return (
    <div className={`mobileNav ${isMenuOpen ? "active" : ""}`}>
      <div
        className="close-btn nav-close-btn d-flex align-items-center justify-content-center"
        onClick={ToggleMenu}
        style={{
          width: "40px",
          height: "40px",
          position: "absolute",
          right: "1.8rem",
          top: "1.8rem",
          cursor: "pointer",
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
