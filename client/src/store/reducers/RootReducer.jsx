import { combineReducers } from "redux";
import { cartSlice } from "./CartReducer";
import { gameSlice } from "./GameReducer";
import { userSlice } from "./UserReducer";

export const rootReducer = combineReducers({
  cartState: cartSlice.reducer,
  gameState: gameSlice.reducer,
  userState: userSlice.reducer,
});
