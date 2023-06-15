import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { setCart } from "../../store/reducers/CartReducer";
import { useEffect, useRef } from "react";

export const AuthDrawer = ({ toggleShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleLogout = async () => {
    await axiosPrivate.get("/user/logout", { withCredentials: true });

    toggleShow(false);
    toast.success("Logged out");

    setAuth({});
    dispatch(setCart([]));
    navigate("/");
  };

  const handleClickOutside = (event) =>
    ref.current &&
    !ref.current.contains(event.target) &&
    toggleShow((prevState) => !prevState);

  return (
    <div className="auth-drawer" ref={ref}>
      {id ? (
        <button className="auth-btn" onClick={handleLogout}>
          Log Out
        </button>
      ) : (
        <>
          <button
            className="auth-btn d-block"
            onClick={() => {
              toggleShow(false);
              navigate("/auth/register", {
                state: { from: location.pathname },
              });
            }}
          >
            Create Account
          </button>
          <button
            className="auth-btn"
            onClick={() => {
              toggleShow(false);
              navigate("/auth", { state: { from: location.pathname } });
            }}
          >
            Log In
          </button>
        </>
      )}
    </div>
  );
};
