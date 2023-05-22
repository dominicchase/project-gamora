import { combineReducers } from "redux";
import { gamesReducer } from "./games";
import { userReducer } from "./user";

const rootReducer = combineReducers({
  gamesState: gamesReducer,
  userState: userReducer,
});

export default rootReducer;
