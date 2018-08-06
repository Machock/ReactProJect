import createReducer from "../../../commons/utils/reducerHelper";
import * as actionTypes from "./actionTypes";

const initState = {
  payload: [],
  flag: true
};

let todo = {
  [actionTypes.TODO_LIST_GET_SUCCESS](state, action) {
    return {
      ...state,
      payload: action.todoList
    };
  }
};

export default createReducer(Object.assign({}, initState), todo);
