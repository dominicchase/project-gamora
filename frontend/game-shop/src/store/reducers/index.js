import { combineReducers } from "redux";
import { gamesReducer } from "./games";
import { userReducer } from "./user";
import { cartSlice } from "./cart";

const rootReducer = combineReducers({
  gamesState: gamesReducer,
  cartState: cartSlice.reducer,
  userState: userReducer,
});

export default rootReducer;
