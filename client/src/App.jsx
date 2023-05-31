import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./core/Navbar";
import { Admin } from "./pages/admin";
import { Catalog } from "./pages/catalog";
import { Blog } from "./pages/blog";
import { Cart } from "./pages/cart";
import { Auth } from "./pages/auth";
import { GameOverlay } from "./pages/catalog/GameOverlay";
import { CartOverlay } from "./pages/cart/CartOverlay";
import { useIsAuthenticated } from "./hooks/useIsAuthenticated";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";

const App = () => {
  useIsAuthenticated();

  const [showGame, toggleShowGame] = useState(false);
  const [showCart, toggleShowCart] = useState(false);

  useEffect(() => {
    if (showGame || showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showGame, showCart]);

  return (
    <>
      <Navbar toggleShowCart={toggleShowCart} />

      <div className="screen-height container py-5">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/"
            element={<Catalog toggleShowGame={toggleShowGame} />}
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

      {showGame && (
        <GameOverlay
          toggleShowGame={toggleShowGame}
          toggleShowCart={toggleShowCart}
        />
      )}

      {showCart && <CartOverlay toggleShowCart={toggleShowCart} />}
    </>
  );
};

export default App;
