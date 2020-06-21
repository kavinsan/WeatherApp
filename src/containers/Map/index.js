import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { compose, withProps } from "recompose";
import Marker from "../../components/marker/index.js";
import MarkerInfo from "../../components/markerInfo/index.js";
import { citiesForecastsSelector } from "../../redux/app/selectors";
import mapStyles from "./mapStyles";

const WeatherMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBChly4zscXfXskkuev6N_TPtSHzPlwFp8&libraries=drawing",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh`, width: "800px" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const { citiesForecasts } = props;
  console.log(localStorage);

  const markers = citiesForecasts
    ? citiesForecasts.map((city, markerId) => {
        // Extract data
        let cityName = city.name;
        let forecastIconUrl = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
        let lng = city.coord.lon;
        let lat = city.coord.lat;
        let temperature = Math.round(Number(city.main.temp)); // Round to whole number
        let feelsLikeTemperature = Math.round(Number(city.main.feels_like));
        let description = city.weather[0].description;
        let humidity = city.main.humidity;
        let wind = city.wind.speed;
        let sunrise = new Date(city.sys.sunrise * 1000); // Get time
        let sunset = new Date(city.sys.sunset * 1000); // Get time
        return (
          <div>
            <Marker
              setActiveMarkerId={setActiveMarkerId}
              activeMarkerId={activeMarkerId}
              markerId={markerId}
              lat={lat}
              lng={lng}
              temperature={temperature}
              forecastIcon
              forecastIconUrl={forecastIconUrl}
            />
            {activeMarkerId == markerId && ( // If active marker is set to the marker id then open popup
              <MarkerInfo
                cityName={cityName}
                forecastIconUrl={forecastIconUrl}
                lng={lng}
                lat={lat}
                temperature={temperature}
                feelsLikeTemperature={feelsLikeTemperature}
                description={description}
                humidity={humidity}
                wind={wind}
                sunrise={sunrise}
                sunset={sunset}
                setActiveMarkerId={setActiveMarkerId}
                markerId={markerId}
              />
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
      {citiesForecasts && markers != null && markers}
    </GoogleMap>
  );
});

const mapStateToProps = (state) => {
  return {
    citiesForecasts: citiesForecastsSelector(state),
  };
};

export default connect(mapStateToProps, null)(WeatherMap);
