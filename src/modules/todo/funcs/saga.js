import { put, takeLatest, fork } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getTodoList() {
  try {
    const result = [
      { msg: "1111" },
      { msg: "2222" },
      { msg: "3333" },
      { msg: "4444" }
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
