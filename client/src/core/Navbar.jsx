import React from "react";
import { Link } from "react-router-dom";

import "../assets/css/navbar.css";
import { deleteToken, getToken } from "../utils/token";

export const Navbar = ({ toggleShowCart }) => {
  const handleLogout = () => deleteToken();

  return (
    <nav className="px-5 d-flex py-4">
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
        {!!getToken() ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <Link to="/auth">Log In</Link>
        )}
        <button onClick={() => toggleShowCart((prevState) => !prevState)}>
          CART
        </button>
      </div>
    </nav>
  );
};
