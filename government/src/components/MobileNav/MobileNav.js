import React from "react";
import { NavLink } from "react-router-dom";
import "./MobileNav.css";

const MobileNav = ({ isMenuOpen, ToggleMenu }) => {
  const navs = [
    {
      name: "Hospital List",
      path: "/",
      icon: "fa-solid fa-list",
    },
    {
      name: "Register",
      path: "/register",
      icon: "fa-solid fa-hospital-user",
    },
    {
      name: "Maps",
      path: "/map",
      icon: "fa-solid fa-map-location-dot",
    },
    {
      name: "Statistics",
      path: "/stats",
      icon: "fa-solid fa-chart-simple",
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
          background: "#000000",
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
      </div>
    </div>
  );
};

export default MobileNav;
