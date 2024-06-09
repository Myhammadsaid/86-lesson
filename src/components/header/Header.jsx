import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <div className="container">
          <nav>
            <div className="nav__logo">
              <a href="#" className="nav__title">
                LOGO
              </a>
            </div>
            <div className="nav__links">
              <NavLink to={"/"} className="nav__link">
                Home
              </NavLink>
              <a href="#" className="nav__link">
                About
              </a>
              <a href="#" className="nav__link">
                Blog
              </a>
              <a href="#" className="nav__link">
                Login
              </a>
              <a href="#" className="nav__link">
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
