import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { setCart } from "../../store/reducers/CartReducer";

export const AuthDrawer = ({ toggleShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleLogout = async () => {
    await axiosPrivate.get("/user/logout", { withCredentials: true });

    // TODO: toast here

    setAuth({});
    dispatch(setCart([]));
    navigate("/");
  };

  return (
    <div className="auth-drawer">
      {id ? (
        <button className="auth-btn" onClick={handleLogout}>
          Log Out
        </button>
      ) : (
        <>
          <button
            className="auth-btn d-block"
            onClick={() =>
              navigate("/auth/register", { state: { from: location.pathname } })
            }
          >
            Create Account
          </button>
          <button
            className="auth-btn"
            onClick={() =>
              navigate("/auth", { state: { from: location.pathname } })
            }
          >
            Log In
          </button>
        </>
      )}
    </div>
  );
};
