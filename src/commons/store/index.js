import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducer from "../utils/createReducer";

export const sagaMiddleWare = createSagaMiddleware();

let finalCreateStore = compose(
  applyMiddleware(sagaMiddleWare)
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore);

export const createStores = () => {
  let store = finalCreateStore(f => {}, {});
  store.asyncReducers = {};
  return store;
};

export const injectAsyncReducer = (store, name, asyncReducer) => {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

let store = createStores();
export default store;