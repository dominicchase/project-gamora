import { Link, useLocation, useNavigate } from "react-router-dom";

import "../assets/css/navbar.css";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setCart } from "../store/reducers/CartReducer";
import axios from "../api/axios";
import { ReactComponent as CartIcon } from "../assets/svg/cart.svg";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";
import { ReactComponent as UserIcon } from "../assets/svg/user.svg";

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
    <nav className="navbar px-5 d-flex py-4">
      <span className="col-3">GAME GARAGE</span>

      <ul className="col-6 d-flex justify-content-center gap-3 list-unstyled">
        {auth?.isAdmin && (
          <li>
            <Link className="fw-bold text-decoration-none" to="/admin">
              Admin
            </Link>
          </li>
        )}

        <li>
          <Link className="fw-bold text-decoration-none" to="/">
            Catalog
          </Link>
        </li>
        {/* <li>
          <Link to="/blog">BLOG</Link>
        </li> */}
      </ul>

      <div className="col d-flex justify-content-end gap-3">
        <Link to="/search">
          <SearchIcon width={30} height={30} />
        </Link>

        {!!auth.accessToken && (
          <button className="bg-transparent border-0" onClick={handleLogout}>
            <UserIcon width={30} height={30} />
          </button>
        )}

        {!auth.accessToken && (
          <Link to="/auth" state={{ from: location.pathname }}>
            <UserIcon width={30} height={30} />
          </Link>
        )}

        <button
          className="bg-transparent border-0"
          onClick={() => toggleShowCart((prevState) => !prevState)}
        >
          <CartIcon width={30} height={30} />
        </button>
      </div>
    </nav>
  );
};
