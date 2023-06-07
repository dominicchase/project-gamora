import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";
import { useAxiosPrivate } from "./hooks/useAxiosPrivate";
import { Navbar } from "./core/Navbar";
import { Admin } from "./pages/admin";
import { Catalog } from "./pages/catalog";
import { Cart } from "./pages/cart";
import { Auth } from "./pages/auth";
import { GameOverlay } from "./pages/catalog/game/GameOverlay";
import { CartOverlay } from "./pages/cart/CartOverlay";
import { useIsAuthenticated } from "./hooks/useIsAuthenticated";
import { Order } from "./pages/Order";
import { setCart } from "./store/reducers/CartReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";

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
  }, []);

  const [showGame, toggleShowGame] = useState(false);
  const [showCart, toggleShowCart] = useState(false);

  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showCart]);

  return (
    <div className="container screen-height px-4">
      <Toaster />

      <Navbar toggleShowCart={toggleShowCart} />

      <Routes>
        <Route path="/" element={<Catalog toggleShowGame={toggleShowGame} />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/order" element={<Order />} />
      </Routes>

      {showGame && (
        <GameOverlay showGame={showGame} toggleShowGame={toggleShowGame} />
      )}

      {showCart && <CartOverlay toggleShowCart={toggleShowCart} />}
    </div>
  );
};

export default App;
