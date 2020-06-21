import { call, takeLatest } from "redux-saga/effects";
import store from "../store";
import axios from "axios";
import { FETCH_CITIES_FORECAST } from "./constants";

export default function* FusionSaga() {
  yield takeLatest(FETCH_CITIES_FORECAST, fetchCitiesForecast);
}

function* fetchCitiesForecast(action) {
  // Hard coded selected city and corresponding city ID for list for prototype purposes
  let cities = {
    "Dease Lake": 5936286,
    "Fort Nelson": 5955902,
    Terrace: 6162949,
    "Prince George": 6113365,
    Whistler: 6180144,
    Revelstoke: 6121621,
    Creston: 5932311,
  };
  // Set city values in store for later use (if needed)
  store.dispatch({
    type: "SET_CITIES",
    payload: {
      cities,
    },
  });
  // Fetch request for all cities
  yield call(fetchCitiesForecastRequest, cities);
}

function fetchCitiesForecastRequest(cities) {
  let date = new Date();
  let minutes = 0;
  let cachedTime = localStorage.getItem("apiFetchTime")
    ? JSON.parse(localStorage.getItem("apiFetchTime"))
    : null;
  if (cachedTime == null) {
    // If time is not cached then store current time
    localStorage.setItem("apiFetchTime", JSON.stringify(date));
  } else {
    // Calculate difference of stored time and current time
    let diff = Date.parse(date) - Date.parse(cachedTime);
    minutes = Math.floor(diff / 1000 / 60);
  }
  /**
   * If a previously fetched data does not exist in cache
   * OR if the difference in time is under 10 minutes then proceed to refetch
   * This is to prevent the open sourced weather api from being spammed and being banned
   */
  if (localStorage.getItem("apiData") == null || minutes >= 10) {
    console.log("Refetching data");
    let cityIds = Object.keys(cities).map((city) => {
      return cities[city];
    });
    let citiesIdString = cityIds.join();
    let url = `http://api.openweathermap.org/data/2.5/group?id=${citiesIdString}&units=metric&appid=448ebdf0283de0ba8ff12c50d734acbf`;
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        let data = res.data.list;
        store.dispatch({ type: "SET_CITIES_FORECASTS", payload: data });
        // Cache time at successful fetch and the data
        localStorage.setItem("apiFetchTime", JSON.stringify(date));
        localStorage.setItem("apiData", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // If data exists and/or the time is not expired then use cached data
    let data = JSON.parse(localStorage.getItem("apiData"));
    store.dispatch({ type: "SET_CITIES_FORECASTS", payload: data });
  }
}

// AIzaSyBChly4zscXfXskkuev6N_TPtSHzPlwFp8
// https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=448ebdf0283de0ba8ff12c50d734acbf
