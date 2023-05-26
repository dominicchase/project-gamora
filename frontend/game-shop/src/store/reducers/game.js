import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: { game: undefined, games: [] },
  reducers: {
    setGame(state, action) {
      state.game = action.payload;
    },
    setGames(state, action) {
      state.games = action.payload;
    },
  },
});

export const { setGame, setGames } = gameSlice.actions;
