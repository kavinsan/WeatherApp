import React from "react";
import { Marker as MapMarker } from "react-google-maps";
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

  /**
   * Only allows one marker to be opened at a time
   */
  const handleActiveMarker = () => {
    // If the marker is already opened then close
    if (activeMarkerId === markerId) {
      return setActiveMarkerId(null);
    }
    // Set id of marker to be opened
    return setActiveMarkerId(markerId);
  };

  const markerStyle = { // Dynamic styling for icons
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