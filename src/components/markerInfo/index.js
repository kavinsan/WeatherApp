import React, { useState, useEffect } from "react";
import { InfoWindow } from "react-google-maps";
import InfoLabel from "../infoLabel/index.js";
import "./styles.css";

const MarkerInfo = (props) => {
  const {
    cityName,
    forecastIconUrl,
    lng,
    lat,
    temperature,
    feelsLikeTemperature,
    description,
    humidity,
    wind,
    sunrise,
    sunset,
    setActiveMarkerId,
    markerId,
  } = props;
  
  const markerInfoStyle = { width: "210px", height: `200px` };

  return (
    <InfoWindow
      position={{ lat: lat + 0.001, lng: lng }}
      onCloseClick={() => {
        setActiveMarkerId(null);
      }}
    >
      <div className="markerInfo" style={{ ...markerInfoStyle }}>
        <div className="forecastHeader">
          <span className="forecastCity">{`${cityName}, BC`} </span>
          <img
            className="forecastIcon"
            style={{ width: "45px", height: "45px" }}
            src={forecastIconUrl}
          />
        </div>
        <div className="infoContainer">
          <div className="temperatureInfoContainer">
            <InfoLabel value={`${temperature}°C`} />
            <InfoLabel value={`${feelsLikeTemperature}°C`} />
          </div>
          <span className="forecastFeelsLike">Feels Like</span>
          <InfoLabel value={description} />
        </div>
        <div className="atmostphereInfoContainer">
          <InfoLabel title="Humidity" value={`${humidity}%`} />
          <InfoLabel title="Wind" value={`${wind}mph`} />
        </div>
        <div className="sunsetInfoContainer">
          <InfoLabel
            title="Sunrise"
            value={`${sunrise.toLocaleTimeString("en-US")}`}
          />
          <InfoLabel
            title="Sunset"
            value={`${sunset.toLocaleTimeString("en-US")}`}
          />
        </div>
      </div>
    </InfoWindow>
  );
};

export default MarkerInfo;
