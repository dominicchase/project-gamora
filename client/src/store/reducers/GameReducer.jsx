import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: { game: undefined, games: [], categories: [], search: "" },
  reducers: {
    setGame(state, action) {
      state.game = action.payload;
    },

    setGames(state, action) {
      state.games = action.payload;
    },

    setCategories(state, action) {
      state.categories = action.payload;
    },

    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setGame, setGames, setCategories, setSearch } =
  gameSlice.actions;
