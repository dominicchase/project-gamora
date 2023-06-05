import { useState } from "react";
import { Link } from "react-router-dom";

export const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const drawerClassName = isOpen ? "drawer-overlay open" : "drawer-overlay";

  return (
    <div className="d-flex flex-column align-items-center">
      <button
        className="bg-transparent border-0 drawer-btn"
        onClick={toggleDrawer}
      >
        <div className="patty mb-2" />
        <div className="patty mb-2" />
        <div className="patty" />
      </button>

      <div
        className={`d-flex flex-column justify-content-center align-items-center py-3 ${drawerClassName}`}
      >
        <Link
          className="h5 text-decoration-none mb-3"
          to="/admin"
          onClick={toggleDrawer}
        >
          Admin
        </Link>

        <Link className="h5 text-decoration-none" to="/" onClick={toggleDrawer}>
          Catalog
        </Link>
      </div>

      {isOpen && <div onClick={toggleDrawer} className="backdrop" />}
    </div>
  );
};
