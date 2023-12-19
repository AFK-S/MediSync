import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./MobileNav.css";
import axios from "axios";
import { StateContext } from "../../context/StateContext.js";

const MobileNav = ({ isMenuOpen, ToggleMenu }) => {
  const { setIsLogin } = useContext(StateContext);
  const Navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("/api/logout");
    setIsLogin(false);
    Navigate("/login");
  };

  const navs = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "fa-solid fa-home",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Patients",
      path: "/patients",
      icon: "fa-solid fa-hospital-user",
    },
    {
      name: "Register Doctor",
      path: "/reg-doc",
      icon: "fa-solid fa-address-card",
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
