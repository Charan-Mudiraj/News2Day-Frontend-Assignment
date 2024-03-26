import React from "react";
import "./css/Header.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="input">
      <label className="value">
        <input
          type="radio"
          checked={currentPath == "/"}
          onChange={() => {
            navigate("/");
          }}
        />
        <i className="fa-solid fa-shapes db-link-icon"></i>
        <p>Dashboard</p>
      </label>
      <hr
        style={{
          height: "30px",
          borderColor: "gray",
          backgroundColor: "gray",
          width: "1px",
        }}
      />
      <label className="value">
        <input
          type="radio"
          checked={currentPath == "/create"}
          onChange={() => {
            navigate("/create");
          }}
        />
        <i className="fa-solid fa-plus db-link-icon"></i>
        <p>Create feed</p>
      </label>
      <label className="value">
        <input
          type="radio"
          checked={currentPath == "/manage"}
          onChange={() => {
            navigate("/manage");
          }}
        />
        <i className="fa-solid fa-list-check db-link-icon"></i>
        <p>Manage Feeds</p>
      </label>
      <label className="value">
        <input
          type="radio"
          checked={currentPath == "/performance"}
          onChange={() => {
            navigate("/performance");
          }}
        />
        <i className="fa-solid fa-chart-simple db-link-icon"></i>
        <p>Performance Reports</p>
      </label>
    </div>
  );
}
