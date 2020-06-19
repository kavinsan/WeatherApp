import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import AppReducer from "./app/reducers";
import AppSaga from "./app/sagas";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([fork(AppSaga)]);
}

const createGlobalReducer = () =>
  combineReducers({
    AppReducer: AppReducer,
  });

// mount it on the Store
const store = createStore(
  createGlobalReducer(),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
