import { combineReducers } from "redux";
import { gamesReducer } from "./games";

const rootReducer = combineReducers({
  gamesState: gamesReducer,
});

export default rootReducer;
