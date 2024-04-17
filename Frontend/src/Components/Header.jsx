import React, { useContext } from "react";
import { Token } from "../Context/AuthContext.jsx";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(Token);

  const handleLogout = () => {
    setAuth({ status: false, user: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  const Styles = {
    link: {
      background: "#353935",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "0.4rem",
      textDecoration: "none",
      color: "whitesmoke",
      cursor: "pointer",
    },
  };

  const getLinkStyle = ({ isActive }) => {
    return {
      background: isActive ? "#03925e" : "#353935",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "0.4rem",
      textDecoration: "none",
      color: "whitesmoke",
      cursor: "pointer",
    };
  };
  const token = localStorage.getItem("token");

  if (auth.user && auth.user.user.type === "ADMIN" && token) {
    return (
      <nav
        style={{
          maxWidth: "800px",
          margin: "auto",
          paddingTop: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NavLink
            to={"/users"}
            style={({ isActive }) => {
              return getLinkStyle({ isActive });
            }}
          >
            Users
          </NavLink>
          <NavLink
            to={"/reports"}
            style={({ isActive }) => {
              return getLinkStyle({ isActive });
            }}
          >
            Reports
          </NavLink>
          <NavLink
            to={"/upload"}
            style={({ isActive }) => {
              return getLinkStyle({ isActive });
            }}
          >
            Upload
          </NavLink>
          <NavLink
            to={"/questionPapers"}
            style={({ isActive }) => {
              return getLinkStyle({ isActive });
            }}
          >
            Papers
          </NavLink>
          <NavLink
            to={"/evaluatePapers"}
            style={({ isActive }) => {
              return getLinkStyle({ isActive });
            }}
          >
            Evaluate Papers
          </NavLink>
          <a style={Styles.link} onClick={handleLogout}>
            Logout
          </a>
        </div>
      </nav>
    );
  }
  if (auth.user && auth.user.user.type === "STUDENT" && token) {
    return (
      <nav
        style={{
          maxWidth: "800px",
          margin: "auto",
          paddingTop: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NavLink
            to={`/reports/${auth.user.user._id}`}
            style={({ isActive }) => {
              return getLinkStyle({ isActive });
            }}
          >
            My Reports
          </NavLink>
          <NavLink
            to={"/papers"}
            style={({ isActive }) => {
              return getLinkStyle({ isActive });
            }}
          >
            Papers
          </NavLink>
          <a style={Styles.link} onClick={handleLogout}>
            Logout
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
