import React from "react";
import "./TopBar.css";
const TopBar = ({ ToggleMenu }) => {
  return (
    <>
      <div className="topbar container-fluid mb-3 p-2 px-md-3">
        <div className="row w-100 flexbox">
          <div className="col-9 col-md-10 d-flex align-items-center ">
            <i
              onClick={ToggleMenu}
              className="fa-solid fa-bars me-3 d-block d-md-none py-2"
              style={{
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            ></i>
            <p className="fw-bold title">Hospital</p>
          </div>
          <div
            className="col-3 col-md-2"
            style={{ display: "flex", justifyContent: "end" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
