import { useState } from "react";
import { AuthButton } from "./AuthButton";
import { SideDrawer } from "./SideDrawer";
import { ReactComponent as CartIcon } from "../../assets/svg/cart.svg";
import GamoraLogo from "../../assets/gamora-logo.png";

export const MobileNavbar = ({ toggleShowCart }) => {
  const [show, toggleShow] = useState(false);
  return (
    <div className="col d-flex d-md-none justify-content-between">
      <div className="col-3 d-block my-auto">
        <SideDrawer />
      </div>

      <img src={GamoraLogo} width={120} />

      <div className="col-3 d-flex">
        <AuthButton show={show} toggleShow={toggleShow} />

        <button
          className="bg-transparent border-0"
          onClick={() => toggleShowCart((prevState) => !prevState)}
        >
          <CartIcon width={30} height={30} />
        </button>
      </div>
    </div>
  );
};
