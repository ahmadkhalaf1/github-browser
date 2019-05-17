import { combineReducers } from "redux";
import gitHubReducer from "../reducers/gitHubReducer";

// we can combine more than one reducer here
export default combineReducers({
  gitHubReducer: gitHubReducer
});
