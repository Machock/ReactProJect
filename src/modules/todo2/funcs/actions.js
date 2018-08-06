import * as actionTypes from "./actionTypes";

export const getTodoList = () => ({
  type: actionTypes.TODO_LIST_GET
});

export const getTodoListSuccess = todoList => ({
  todoList,
  type: actionTypes.TODO_LIST_GET_SUCCESS
});
