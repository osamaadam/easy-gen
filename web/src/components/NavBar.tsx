import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import "./NavBar.scss";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to={user ? "/" : "/login"}>
            <h1>EasyAuth</h1>
          </Link>
        </div>

        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          {user ? (
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
            </div>
          ) : null}

          <div className="navbar-end">
            {user ? (
              <>
                <span className="navbar-item user-name">
                  Welcome, {user.name}
                </span>
                <button className="navbar-item logout-button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
                <Link to="/register" className="navbar-item register-button">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
