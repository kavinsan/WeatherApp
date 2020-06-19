import React, { Component, useState, useEffect } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { compose, withProps } from "recompose";

const WeatherMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBChly4zscXfXskkuev6N_TPtSHzPlwFp8&libraries=drawing",
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [toggle, setToggle] = useState(false);
  const [markerEnter, setMarkerEnter] = useState(false);
  const markerStyle = {
    url:
      "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png",
    scaledSize: new window.google.maps.Size(55, 55),
  };
  const labelStyle = {
    transition: "all 0.3s linear",
  };
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 49.049999, lng: -122.316666 }}
    >
      <MarkerWithLabel
        position={{ lat: 49.049999, lng: -122.316666 }}
        labelAnchor={new window.google.maps.Point(100, 120)}
        labelStyle={{
          visibility: toggle ? "visible" : "hidden",
          fontSize: "22px",
          padding: "16px",
          width: "200px",
        }}
        icon={{
          url:
            "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png",
          scaledSize: new window.google.maps.Size(0, 0),
        }}
      >
        <div style={{ ...labelStyle }}>
          Hello There!
          <img
            style={{
              position: "absolute",
              backgroundColor: "yellow",
              width: "100px",
              height: "100px",
            }}
            src={
              "https://s3.ca-central-1.amazonaws.com/cryptomibs/8256dee88e0a477886e5854dd499e3e3-225.png"
            }
          ></img>
        </div>
      </MarkerWithLabel>
      <Marker
        position={{ lat: 49.049999, lng: -122.316666 }}
        labelAnchor={new window.google.maps.Point(0, 0)}
        label={{
          text:  "23°",
          color: "white",
          fontSize: "bold",
          fontSize: "15px",
        }}
        icon={{
          ...markerStyle,
        }}
        onClick={() => setToggle(!toggle)}
      ></Marker>
      {/* {toggle == true && (
        <InfoWindow
          position={{ lat: 49.049999, lng: -122.316666 }}
          onCloseClick={() => {
            setToggle(false);
          }}
        >
          <div style={{ width: "100px", height: "100px" }}>
            <img
              style={{ width: "100px", height: "100px" }}
              src={
                "https://s3.ca-central-1.amazonaws.com/cryptomibs/8256dee88e0a477886e5854dd499e3e3-225.png"
              }
            ></img>
          </div>
        </InfoWindow>
      )} */}
    </GoogleMap>
  );
});
export default WeatherMap;
