import { combineReducers } from "redux";
import tempReducer from "./temperature/reducer";

const rootReducer = combineReducers({
  temp: tempReducer,
});
export default rootReducer;
