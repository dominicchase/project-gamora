import React from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./core/Navbar";
import { Admin } from "./pages/admin";
import { Catalog } from "./pages/catalog";
import { Blog } from "./pages/blog";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Game } from "./pages/game";

const App = () => {
  return (
    <>
      <Navbar />

      <div className="screen-height container py-5">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Catalog />} />
          <Route path="/:id" element={<Game />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
