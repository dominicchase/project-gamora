import React from "react";
import { Link } from "react-router-dom";

import "../public/css/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar px-5 d-flex py-4">
      <span className="col-3">GAME GARAGE</span>

      <ul className="col-6 d-flex justify-content-center gap-5">
        <li>
          <Link to="/admin">ADMIN</Link>
        </li>
        <li>
          <Link to="/">CATALOG</Link>
        </li>
        <li>
          <Link to="/blog">BLOG</Link>
        </li>
      </ul>

      <div className="col d-flex justify-content-end gap-5">
        <span>SEARCH</span>
        <span>USER</span>
        <span>CART</span>
      </div>
    </nav>
  );
};
