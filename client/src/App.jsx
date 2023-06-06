import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./core/Navbar";
import { Admin } from "./pages/admin";
import { Catalog } from "./pages/catalog";
// import { Blog } from "./pages/blog";
import { Cart } from "./pages/cart";
import { Auth } from "./pages/auth";
import { GameOverlay } from "./pages/catalog/GameOverlay";
import { CartOverlay } from "./pages/cart/CartOverlay";
import { useIsAuthenticated } from "./hooks/useIsAuthenticated";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import { Search } from "./pages/search";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";
import { useAxiosPrivate } from "./hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setCart } from "./store/reducers/CartReducer";
import { Order } from "./pages/Order";

const App = () => {
  useIsAuthenticated();
  const dispatch = useDispatch();
  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // TODO: extract to custom hook
  useEffect(() => {
    const getCart = async () => {
      if (id) {
        const response = await axiosPrivate.get(`/cart/?id=${id}`);
        dispatch(setCart(response.data.games));
      }
    };
    getCart();
  });

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
    <div className="container screen-height px-4">
      <Toaster />

      <Navbar
        toggleShowCart={toggleShowCart}
        style={{ border: "4px solid red", position: "sticky", top: 0 }}
      />

      <Routes>
        <Route path="/" element={<Catalog toggleShowGame={toggleShowGame} />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/order" element={<Order />} />
      </Routes>

      {showGame && (
        <GameOverlay
          toggleShowGame={toggleShowGame}
          toggleShowCart={toggleShowCart}
        />
      )}

      {showCart && <CartOverlay toggleShowCart={toggleShowCart} />}
    </div>
  );
};

export default App;
