import { useReducer } from "react";
import axios from "../../api/axios";

const initialState = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const Register = ({ toggleIsNewUser, syncCart }) => {
  const [userState, userDispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    initialState
  );

  const { email, password, passwordConfirmation } = userState;

  const handleRegister = async (event) => {
    event.preventDefault();

    const response = await axios.post("/user/register", { email, password });

    if (response.data) {
      toggleIsNewUser(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    userDispatch({ ...userState, [name]: value });
  };

  return (
    <form>
      <fieldset className="mb-3">
        <label className="d-block mb-2">Email</label>
        <input type="text" name="email" value={email} onChange={handleChange} />
      </fieldset>

      <fieldset className="mb-3">
        <label className="d-block mb-2">Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset className="mb-3">
        <label className="d-block mb-2">Re-enter password</label>
        <input
          type="text"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={handleChange}
        />
      </fieldset>

      <button className="mb-3" type="submit" onClick={handleRegister}>
        Register
      </button>

      <div>
        <span className="d-block mb-3">Already have an account?</span>

        <button
          type="button"
          onClick={() => toggleIsNewUser((prevState) => !prevState)}
        >
          Sign in
        </button>
      </div>
    </form>
  );
};
