import React, { useState, useEffect } from "react";
import { Marker as MapMarker } from "react-google-maps";
import { connect } from "react-redux";
import "./styles.css";

const Marker = (props) => {
  const {
    setActiveMarkerId,
    activeMarkerId,
    markerId,
    lat,
    lng,
    temperature,
    forecastIconUrl,
  } = props;

  const handleActiveMarker = () => {
    if (activeMarkerId == markerId) {
      return setActiveMarkerId(null);
    }
    return setActiveMarkerId(markerId);
  };

  const markerStyle = {
    url: forecastIconUrl,
    scaledSize: new window.google.maps.Size(70, 75),
  };

  return (
    <MapMarker
      position={{ lat: lat, lng: lng }}
      labelAnchor={new window.google.maps.Point(100, 120)}
      label={{
        text: `${temperature}°C`,
        color: "black",
        fontWeight: "900",
        fontSize: "15px",
      }}
      icon={{
        ...markerStyle,
      }}
      onClick={() => handleActiveMarker()}
    />
  );
};

export default Marker;