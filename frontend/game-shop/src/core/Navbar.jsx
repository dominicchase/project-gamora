import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setGames } from "../store/reducers/games";

import "../public/css/navbar.css";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleNavigate = () => dispatch(setGames([]));

  return (
    <nav className="navbar px-5 d-flex py-4">
      <span className="col-3">GAME GARAGE</span>

      <ul className="col-6 d-flex justify-content-center gap-5">
        <li>
          <Link to="/admin" onClick={handleNavigate}>
            ADMIN
          </Link>
        </li>
        <li>
          <Link to="/" onClick={handleNavigate}>
            CATALOG
          </Link>
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
