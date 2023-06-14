import { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { setCart } from "../../store/reducers/CartReducer";
import axios from "../../api/axios";

const initialState = {
  email: "",
  password: "",
};

export const Auth = ({ toggleIsNewUser }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { cart } = useSelector((state) => state.cartState);

  const [userState, userDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    initialState
  );

  const syncCart = async (id) => {
    let response;

    if (cart.length) {
      try {
        response = await axiosPrivate.post(`/cart/add-to-cart/?id=${id}`, cart);
        toast.success("Added to cart");
      } catch (error) {
        response = await axiosPrivate.get(`/cart/?id=${id}`);
        toast.error(error.response.data.error);
      }
    } else {
      response = await axiosPrivate.get(`/cart/?id=${id}`);
    }

    dispatch(setCart(response.data.games ?? []));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await axios
      .post("/user/login", userState, {
        withCredentials: true,
      })
      .catch((err) => toast.error(err.response.data.message));

    await setAuth({
      id: response.data.id,
      accessToken: response.data.accessToken,
      ...(response.data.isAdmin && { isAdmin: response.data.isAdmin }),
    });

    syncCart(response.data.id);

    toast.success("Logged in");

    navigate("/");
  };

  return (
    <form className="mt-4" onSubmit={handleLogin}>
      <fieldset className="mx-auto col-md-6 col-xl-3 mb-4">
        <input
          onChange={(event) =>
            userDispatch({ ...userState, email: event.target.value })
          }
          type="text"
          placeholder="Email"
        />
      </fieldset>

      <fieldset className="mx-auto col-md-6 col-xl-3 mb-4">
        <input
          onChange={(event) =>
            userDispatch({ ...userState, password: event.target.value })
          }
          type="password"
          placeholder="Password"
        />
      </fieldset>

      <div className="mx-auto col-md-6 col-xl-3">
        <button type="submit" className="btn-secondary mb-3">
          Login
        </button>

        <span className="d-block text-center">
          New to Gamora?
          <button
            className="btn-no-bg"
            onClick={() =>
              navigate("/auth/register", { state: { from: location.pathname } })
            }
            type="button"
          >
            Register
          </button>
        </span>
      </div>
    </form>
  );
};
