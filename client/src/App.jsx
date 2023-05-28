import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./core/Navbar";
import { Admin } from "./pages/admin";
import { Catalog } from "./pages/catalog";
import { Blog } from "./pages/blog";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import { Auth } from "./pages/auth";
import { GameOverlay } from "./pages/catalog/GameOverlay";
import { CartOverlay } from "./pages/cart/CartOverlay";
import { Cart } from "./pages/cart";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import { useRefreshToken } from "./hooks/useRefreshToken";
import { useAxiosPrivate } from "./hooks/useAxiosPrivate";

const App = () => {
  const [showGame, toggleShowGame] = useState(false);
  const [showCart, toggleShowCart] = useState(false);

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, toggleIsLoading] = useState(true);

  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const isLoggedIn = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log({ error });
      } finally {
        toggleIsLoading(false);
      }
    };

    !auth?.accessToken ? isLoggedIn() : toggleIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log({ isLoading });
    console.log(auth?.accessToken);
  }, [isLoading]);

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
