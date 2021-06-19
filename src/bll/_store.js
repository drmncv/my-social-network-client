import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import app from "./app";
import auth from "./auth";
import users from "./users";
import profile from "./profile";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({ app, auth, users, profile });

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
