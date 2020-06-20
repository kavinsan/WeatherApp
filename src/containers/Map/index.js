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
import mapStyles from "./mapStyles";
import {
  citiesSelector,
  citiesForecastsSelector,
} from "../../redux/app/selectors";
import { connect } from "react-redux";
import "./styles.css";

const WeatherMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBChly4zscXfXskkuev6N_TPtSHzPlwFp8&libraries=drawing",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [toggle, setToggle] = useState(false);
  const [markerEnter, setMarkerEnter] = useState(false);
  const [active, setActive] = useState(null);
  const labelStyle = {
    transition: "all 0.3s linear",
  };
  const { cities, citiesForecasts } = props;
  console.log(citiesForecasts);
  const [height, setHeight] = useState(100);
  const [citiesMarkers, setCitiesMarkers] = useState([]);
  console.log(localStorage);
  const markers = citiesForecasts
    ? citiesForecasts.map((city, index) => {
        let temperature = Math.round(Number(city.main.temp));
        let markerIconUrl = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
        let name = city.name;
        let lng = city.coord.lon;
        let lat = city.coord.lat;
        let type = city.weather[0].main;
        let description = city.weather[0].description;
        let humidity = city.main.humidity;
        let feelsLike = city.main.feels_like;
        console.log(type);
        let markerStyle = {
          url: markerIconUrl,
          scaledSize: new window.google.maps.Size(70, 75),
        };
        let markerInfoStyle = { width: "180px", height: `${height}px` };
        return (
          <div>
            <Marker
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
              onClick={() => setActive(index)}
            ></Marker>
            {active == index && (
              <InfoWindow
                position={{ lat: lat + 0.001, lng: lng }}
                onCloseClick={() => {
                  setActive(null);
                  setHeight(100);
                }}
              >
                <div className="markerInfo" style={{ ...markerInfoStyle }}>
                  <div className="forecastHeader">
                    <span className="forecastCity">{`${name}`} </span>
                    <img
                      className="forecastIcon"
                      style={{ width: "45px", height: "45px" }}
                      src={markerIconUrl}
                      onClick={() => {
                        setHeight(200);
                      }}
                    ></img>
                  </div>
                  <span className="forecastTitle">{`${temperature}°C`}</span>
                  <span className="forecastDescription">{`${description}`}</span>
                </div>
              </InfoWindow>
            )}
          </div>
        );
      })
    : null;

  return (
    <GoogleMap
      defaultZoom={5.5}
      defaultCenter={{ lat: 53.92, lng: -122.75 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {citiesForecasts && markers}
    </GoogleMap>
  );
});

const mapStateToProps = (state) => {
  return {
    cities: citiesSelector(state),
    citiesForecasts: citiesForecastsSelector(state),
  };
};

export default connect(mapStateToProps, null)(WeatherMap);
