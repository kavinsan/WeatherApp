import { call, put, takeEvery, takeLatest, delay } from "redux-saga/effects";
import store from "../store";
import forecastData from "./data/forecast.json";
import axios from "axios";

export default function* FusionSaga() {
  yield takeLatest("FETCH_TEST", fetchTest);
  yield takeLatest("FETCH_CITIES_FORECAST", fetchCitiesForecast);
}

// AIzaSyBChly4zscXfXskkuev6N_TPtSHzPlwFp8
// https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=448ebdf0283de0ba8ff12c50d734acbf
// https://openweathermap.org/weather-conditions#Icon-list
// http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric
function* fetchTest(action) {
  yield call(fetchTestRequest, action);
}

function fetchTestRequest(action) {
  console.log("hey");
}

function* fetchCitiesForecast(action) {
  let cities = {
    "Dease Lake": 5936286,
    "Fort Nelson": 5955902,
    Terrace: 6162949,
    "Prince George": 6113365,
    Whistler: 6180144,
    Revelstoke: 6121621,
    Creston: 5932311,
  };
  store.dispatch({
    type: "SET_CITIES",
    payload: {
      cities,
    },
  });
  yield call(fetchCitiesForecastRequest, cities);
}

function fetchCitiesForecastRequest(cities) {
  let date = new Date();
  let minutes = 0;
  let cachedTime = localStorage.getItem("apiFetchTime")
    ? JSON.parse(localStorage.getItem("apiFetchTime"))
    : null;
  if (cachedTime == null) {
    console.log("Storing instead");
    localStorage.setItem("apiFetchTime", JSON.stringify(date));
  } else {
    console.log("Here is the old timer vs new timer");
    console.log(cachedTime);
    console.log(date);
    let diff = Date.parse(date) - Date.parse(cachedTime);
    minutes = Math.floor(diff / 1000 / 60);
  }
  console.log(minutes);
  if (localStorage.getItem("apiData") == null || minutes >= 10) {
    console.log("Refetching data");
    let citiesIdString = "";
    Object.keys(cities).map((city, index) => {
      citiesIdString =
        index == 0 ? `${cities[city]}` : `${citiesIdString},${cities[city]}`;
    });
    let url = `http://api.openweathermap.org/data/2.5/group?id=${citiesIdString}&units=metric&appid=448ebdf0283de0ba8ff12c50d734acbf`;

    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        let data = res.data.list;
        store.dispatch({ type: "SET_CITIES_FORECASTS", payload: data });
        localStorage.setItem("apiFetchTime", JSON.stringify(date));
        localStorage.setItem("apiData", JSON.stringify(data));
        console.log("New time stored");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    let data = JSON.parse(localStorage.getItem("apiData"));
    store.dispatch({ type: "SET_CITIES_FORECASTS", payload: data });
  }

  // let data = [];
  // Object.keys(cities).map((city) => {
  //   data.push(forecastData[city]);
  //   store.dispatch({ type: "SET_CITIES_FORECASTS", payload: data });
  // });
}
