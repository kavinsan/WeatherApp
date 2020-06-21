import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import WeatherMap from "./containers/Map/index";
const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch({ type: "FETCH_CITIES_FORECAST" });
  });

  return (
    <div className="App">
      <WeatherMap />
    </div>
  );
};

export default connect(null, null)(App);
