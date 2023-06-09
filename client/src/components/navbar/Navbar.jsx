import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthButton } from "./AuthButton";
import { MobileNavbar } from "./MobileNavbar";
import { Search } from "./Search";
import { ReactComponent as CartIcon } from "../../assets/svg/cart.svg";
import GamoraLogo from "../../assets/gamora-logo.png";
import "../../assets/css/navbar.css";

export const Navbar = ({ toggleShowCart }) => {
  const [show, toggleShow] = useState(false);

  return (
    <nav className="navbar px-4 mb-4">
      <MobileNavbar toggleShowCart={toggleShowCart} />

      <div className="d-none d-md-flex justify-content-between w-100">
        <div className="col-3">
          <img src={GamoraLogo} width={150} />
        </div>

        <div className="col-6 d-flex justify-content-center align-items-center gap-4">
          <Link
            className="h5 text-decoration-none align-middle text-center"
            to="/admin"
          >
            Admin
          </Link>

          <Link className="h5 text-decoration-none" to="/">
            Catalog
          </Link>
        </div>

        <div className="col-3 d-flex justify-content-end gap-3">
          <Search />

          <AuthButton show={show} toggleShow={toggleShow} />

          <button
            className="d-none d-md-block bg-transparent border-0 p-0"
            onClick={() => toggleShowCart((prevState) => !prevState)}
          >
            <CartIcon width={30} height={30} />
          </button>
        </div>
      </div>
    </nav>
  );
};
