import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNavigation.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../slice/UserSlice.js";
import { useCookies } from "react-cookie";
import axios from "axios";

const SideNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["_id"]);
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
  ];

  return (
    <div className="navigation rounded p-3 d-flex flex-column">
      <div style={{ overflow: "auto" }}>
        {navs.map((e, index) => {
          const { name, path, icon } = e;
          return (
            <NavLink to={path} className="navlink my-2 rounded-s" key={index}>
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
