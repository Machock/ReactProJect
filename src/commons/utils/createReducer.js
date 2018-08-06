import { combineReducers } from "redux";

export default asyncReducer => {
  return combineReducers(Object.assign({}, asyncReducer));
};
