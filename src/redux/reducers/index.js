import { combineReducers } from "redux";
import postsReducers from "./postReducer";

export default combineReducers({
    posts: postsReducers
});