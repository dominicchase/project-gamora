import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { setSearch } from "../store/reducers/GameReducer";
import { setCart } from "../store/reducers/CartReducer";
import GamoraLogo from "../assets/gamora-logo.png";
import { ReactComponent as SearchIcon } from "../assets/svg/search.svg";
import { ReactComponent as CartIcon } from "../assets/svg/cart.svg";
import "../assets/css/navbar.css";

export const Navbar = ({ toggleShowCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { search } = useSelector((state) => state.gameState);

  // const handleLogout = async () => {
  //   await axios.get("/user/logout", { withCredentials: true });

  //   setAuth({});
  //   dispatch(setCart([]));
  //   navigate("/");
  // };

  return (
    <nav className="navbar">
      <div className="col-3">
        <img src={GamoraLogo} alt="" width={125} />
      </div>

      <div className="col d-flex justify-content-center gap-5">
        <Link className="h5 text-decoration-none" to="/admin">
          Admin
        </Link>

        <Link className="h5 text-decoration-none" to="/">
          Catalog
        </Link>
      </div>

      <div className="col-3 d-flex justify-content-end gap-3">
        <div className="search">
          <SearchIcon className="search-logo" width={30} height={30} />

          <input
            className="search-field"
            value={search}
            onChange={(event) => dispatch(setSearch(event.target.value))}
            placeholder="Search..."
            type="text"
          />
        </div>

        {/* {!!auth.accessToken && (
          <button className="bg-transparent border-0" onClick={handleLogout}>
          <UserIcon width={30} height={30} />
          </button>
          )}
          
          {!auth.accessToken && (
            <Link to="/auth" state={{ from: location.pathname }}>
            <UserIcon width={30} height={30} />
            </Link>
          )} */}

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
