// Initial state
const initialState = {
  user: {
    email: "",
    token: "",
  },
};

// Reducer function
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});
