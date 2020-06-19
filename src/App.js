import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { mapsSelector } from "./redux/app/selectors";
import WeatherMap from "./containers/Map/index";
const App = (props) => {
  const { dispatch, maps } = props;

  useEffect(() => {
    console.log(maps);
  }, [maps]);

  return (
    <div className="App">
      <WeatherMap />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    maps: mapsSelector(state),
  };
};

export default connect(mapStateToProps, null)(App);
