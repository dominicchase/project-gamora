// Initial state
const initialState = {
  games: [],
};

// Reducer function
export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GAMES":
      return {
        ...state,
        games: action.payload,
      };

    default:
      return state;
  }
};

export const setGames = (games) => ({
  type: "SET_GAMES",
  payload: games,
});
