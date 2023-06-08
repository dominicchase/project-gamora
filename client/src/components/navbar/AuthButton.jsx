import { AuthDrawer } from "./AuthDrawer";
import { ReactComponent as UserIcon } from "../../assets/svg/user.svg";

export const AuthButton = ({ show, toggleShow }) => (
  <div className="position-relative d-block my-auto">
    <button
      className="bg-transparent border-0"
      onClick={() => toggleShow((prevState) => !prevState)}
    >
      <UserIcon width={30} height={30} />
    </button>

    {show && <AuthDrawer toggleShow={toggleShow} />}
  </div>
);
