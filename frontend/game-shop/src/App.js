import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./core/Navbar";
import { Admin } from "./pages/admin";
import { Catalog } from "./pages/catalog";
import { Blog } from "./pages/blog";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Game } from "./pages/game";
import { Cart } from "./pages/catalog/Cart";

const App = () => {
  const [show, toggleShow] = useState(false);

  const handleCartOverlay = () => {
    toggleShow((prevState) => !prevState);

    if (!show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <>
      <Navbar handleCartOverlay={handleCartOverlay} />

      <div
        className={`${show && "overflow-hidden"} screen-height container py-5`}
      >
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Catalog />} />
          <Route path="/:id" element={<Game />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>

      <Cart show={show} handleCartOverlay={handleCartOverlay} />
    </>
  );
};

export default App;
