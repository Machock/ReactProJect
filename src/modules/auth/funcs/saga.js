import { put, takeLatest, fork } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* loginData({ username, password }) {
    try {
        console.log(username, password);
        debugger;
        yield put(actions.loginSuccess());
    } catch (error) {
        console.log(error);
    }
}

export default function* rootSaga() {
  yield takeLatest(actionTypes.LOGIN_REQUEST, loginData)
}