import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const SideDrawer = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: find better approach
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const drawerClassName = isOpen ? "drawer-overlay open" : "drawer-overlay";

  return (
    <div className="my-auto">
      <button
        className="bg-transparent border-0 m-0 d-block drawer-btn"
        onClick={toggleDrawer}
      >
        <div className="patty mb-2" />
        <div className="patty mb-2" />
        <div className="patty" />
      </button>

      <div
        className={`d-flex justify-content-evenly align-items-center py-3 ${drawerClassName}`}
      >
        {auth.isAdmin && (
          <Link
            className="h5 text-decoration-none"
            to="/admin"
            onClick={toggleDrawer}
          >
            Admin
          </Link>
        )}

        <Link className="h5 text-decoration-none" to="/" onClick={toggleDrawer}>
          Catalog
        </Link>
      </div>

      {isOpen && <div onClick={toggleDrawer} className="backdrop" />}
    </div>
  );
};
