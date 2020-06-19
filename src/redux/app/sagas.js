import { call, put, takeEvery, takeLatest, delay } from "redux-saga/effects";
import store from "../store";

export default function* FusionSaga() {
  yield takeLatest("FETCH_TEST", fetchTest);
}

function* fetchTest(action){
    yield call(fetchTestRequest, action);
}

function fetchTestRequest(action){
    console.log("hey")
}