import { useReducer } from "react";
import { toast } from "react-hot-toast";
import axios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const Register = ({ toggleIsNewUser, syncCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userState, userDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    initialState
  );

  const { email, password, passwordConfirmation } = userState;

  const handleRegister = async (event) => {
    event.preventDefault();

    const response = await axios
      .post("/user/register", { email, password })
      .catch((err) => toast.error(err.response.data.message));

    if (response.data) {
      toast.success("User registered");
      navigate("/");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    userDispatch({ ...userState, [name]: value });
  };

  return (
    <form className="mt-4">
      <fieldset className="mx-auto col-md-6 col-xl-3 mb-4">
        <input
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
          placeholder="Email"
        />
      </fieldset>

      <fieldset className="mx-auto col-md-6 col-xl-3 mb-4">
        <input
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
      </fieldset>

      <fieldset className="mx-auto col-md-6 col-xl-3 mb-4">
        <input
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={handleChange}
          type="password"
          placeholder="Re-enter Password"
        />
      </fieldset>

      <div className="mx-auto col-md-6 col-xl-3 mb-4">
        <button
          className="btn-secondary mb-3"
          type="submit"
          onClick={handleRegister}
        >
          Register
        </button>

        <span className="d-block text-center">
          Already have an account?
          <button
            className="btn-no-bg"
            onClick={() =>
              navigate("/auth", { state: { from: location.pathname } })
            }
            type="button"
          >
            Sign in
          </button>
        </span>
      </div>
    </form>
  );
};
