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
  const { state } = useLocation();
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

    const response = await axios.post("/user/login", userState, {
      withCredentials: true,
    });

    await setAuth({
      id: response.data.id,
      accessToken: response.data.accessToken,
      ...(response.data.isAdmin && { isAdmin: response.data.isAdmin }),
    });

    syncCart(response.data.id);

    console.log("here");

    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <fieldset>
        <input
          className="d-block mx-auto mb-4"
          onChange={(event) =>
            userDispatch({ ...userState, email: event.target.value })
          }
          type="text"
          placeholder="Email"
        />
      </fieldset>

      <fieldset className="mb-5">
        <input
          className="d-block mx-auto"
          onChange={(event) =>
            userDispatch({ ...userState, password: event.target.value })
          }
          type="password"
          placeholder="Password"
        />
      </fieldset>

      <button type="submit" className="d-block btn-secondary mx-auto mb-3">
        Login
      </button>

      <div className="text-center">
        <span>New to Gamora?</span>

        <button
          className="btn-no-bg"
          onClick={() =>
            navigate("/auth/register", { state: { from: location.pathname } })
          }
          type="button"
        >
          Register
        </button>
      </div>
    </form>
  );
};
