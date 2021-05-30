import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import app from "./app";
import auth from "./auth";
import users from "./users";
import profile from "./profile";

const reducer = combineReducers({ app, auth, users, profile });

export default createStore(reducer, applyMiddleware(thunk));
