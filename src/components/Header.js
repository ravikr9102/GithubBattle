import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="nav">
        <NavLink className="link" activeClassname="active" exact="true" to="/">
          <li>Popular</li>
        </NavLink>
        <NavLink className="link" activeClassname="active" to="/Battle">
          <li>Battle</li>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
