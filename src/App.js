import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import { mapsSelector } from './redux/app/selectors';

const App = (props) => {
  const {
    dispatch,
    maps
  } = props;

  useEffect(() => {
    console.log(maps)
  },[maps])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    maps: mapsSelector(state)
  };
};

export default connect(mapStateToProps, null)(App);
