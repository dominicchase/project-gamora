import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Admin } from "./pages/admin";
import { Catalog } from "./pages/catalog";
import { Blog } from "./pages/blog";
// import { Auth } from "./pages/auth";

const App = () => {
  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Catalog />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      {/* <Auth /> */}
    </div>
  );
};
const Navbar = () => {
  return (
    <nav className="d-flex py-4">
      <span className="col-3">GAME GARAGE</span>

      <ul className="col-6 d-flex justify-content-center gap-5">
        {/* TODO: ONLY RENDER ADMIN IF USER IS ADMIN */}
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

export default App;
