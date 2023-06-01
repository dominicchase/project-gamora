import { Link, useLocation, useNavigate } from "react-router-dom";

import "../assets/css/navbar.css";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setCart } from "../store/reducers/CartReducer";
import axios from "../api/axios";

export const Navbar = ({ toggleShowCart }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    await axios.get("/user/logout", { withCredentials: true });

    setAuth({});
    dispatch(setCart([]));
    navigate("/");
  };

  return (
    <nav className="px-5 d-flex py-4">
      <span className="col-3">GAME GARAGE</span>

      <ul className="col-6 d-flex justify-content-center gap-5">
        {auth?.isAdmin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        <li>
          <Link to="/">Catalog</Link>
        </li>
        {/* <li>
          <Link to="/blog">BLOG</Link>
        </li> */}
      </ul>

      <div className="col d-flex justify-content-end gap-5">
        <Link to="/search">Search</Link>

        {!!auth.accessToken && <button onClick={handleLogout}>Log Out</button>}

        {!auth.accessToken && (
          <Link to="/auth" state={{ from: location.pathname }}>
            Log In
          </Link>
        )}

        <button onClick={() => toggleShowCart((prevState) => !prevState)}>
          CART
        </button>
      </div>
    </nav>
  );
};
