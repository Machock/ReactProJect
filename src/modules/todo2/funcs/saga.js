import {  put, takeLatest, fork } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getTodoList() {
  try {
    const result = [
      { msg: "todo2 task1" },
      { msg: "todo2 task2" },
      { msg: "todo2 task3" },
      { msg: "todo2 task4" }
    ];
    yield put(actions.getTodoListSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

function* getTodoListSaga() {
  yield takeLatest(actionTypes.TODO_LIST_GET, getTodoList);
}

export default function* root() {
  yield [fork(getTodoListSaga)];
}
