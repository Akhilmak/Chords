

import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import searchReducer from "./State/SongSearch/Reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  search:searchReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));