import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";
import { useAxiosPrivate } from "./hooks/useAxiosPrivate";
import { Navbar } from "./components/navbar/Navbar";
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
import { Register } from "./pages/auth/Register";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const App = () => {
  useIsAuthenticated();
  const dispatch = useDispatch();
  const { id } = useAuth();
  const axiosPrivate = useAxiosPrivate();

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
      <Navbar toggleShowCart={toggleShowCart} />
      <Routes>
        <Route path="/" element={<Catalog toggleShowGame={toggleShowGame} />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/auth/register" element={<Register />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/order" element={<Order />} />
      </Routes>

      {showGame && <GameOverlay toggleShowGame={toggleShowGame} />}

      <Drawer
        open={showCart}
        onClose={() => toggleShowCart((prevState) => !prevState)}
        direction="right"
        className="w-100 cart-drawer overflow-auto"
      >
        <CartOverlay toggleShowCart={toggleShowCart} />
      </Drawer>
    </div>
  );
};

export default App;
