import { useReducer } from "react";
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

    const response = await axios.post("/user/register", { email, password });

    // TODO: use toasts

    if (response.data) {
      navigate("/");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    userDispatch({ ...userState, [name]: value });
  };

  return (
    <form>
      <fieldset className="mb-4">
        <input
          className="d-block mx-auto"
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
          placeholder="Email"
        />
      </fieldset>

      <fieldset className="mb-4">
        <input
          className="d-block mx-auto"
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
      </fieldset>

      <fieldset className="mb-5">
        <input
          className="d-block mx-auto"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={handleChange}
          type="password"
          placeholder="Re-enter Password"
        />
      </fieldset>

      <button
        className="d-block btn-secondary mx-auto mb-3"
        type="submit"
        onClick={handleRegister}
      >
        Register
      </button>

      <div className="text-center">
        <span>Already have an account?</span>

        <button
          className="btn-no-bg"
          onClick={() =>
            navigate("/auth", { state: { from: location.pathname } })
          }
          type="button"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};
