import { call, put, takeEvery, takeLatest, delay } from "redux-saga/effects";
import store from "../store";

export default function* FusionSaga() {
  yield takeLatest("FETCH_TEST", fetchTest);
}
// AIzaSyBChly4zscXfXskkuev6N_TPtSHzPlwFp8
// https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=448ebdf0283de0ba8ff12c50d734acbf
function* fetchTest(action){
    yield call(fetchTestRequest, action);
}

function fetchTestRequest(action){
    console.log("hey")
}