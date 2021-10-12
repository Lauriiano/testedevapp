import { combineReducers } from "redux";
import userReducer from "./userReducer";
import lojaReducer from './lojaReducer';

export default combineReducers({
    userReducer,
    lojaReducer
});