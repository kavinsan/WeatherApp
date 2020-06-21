import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { mapsSelector } from "./redux/app/selectors";
import WeatherMap from "./containers/Map/index";
const App = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch({ type: "FETCH_CITIES_FORECAST" });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="box"></div>
        <WeatherMap />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, null)(App);
