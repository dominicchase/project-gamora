import { combineReducers } from "redux";
import { gameSlice } from "./game";
import { cartSlice } from "./cart";
import { userSlice } from "./user";

const rootReducer = combineReducers({
  gameState: gameSlice.reducer,
  cartState: cartSlice.reducer,
  userState: userSlice.reducer,
});

export default rootReducer;
