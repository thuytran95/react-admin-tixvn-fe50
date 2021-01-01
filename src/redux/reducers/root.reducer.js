import { combineReducers } from "redux";
import MovieReducer from "./movie.reducer";
import UserReducer from "./user.reducer";

const rootReducer = combineReducers({
  // child reducer
  movie: MovieReducer,
  user: UserReducer,
  // common: commonReducer
});

export default rootReducer;
