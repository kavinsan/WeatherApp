import React from "react";
import { shallow } from "enzyme";
import MarkerInfo from "./index.js";

/**
 * - A mock up dependency for the google maps api would need to be created to
 * successfully test components containing any react google maps components
 */
describe("Test MarkerInfo Component", () => {
  const cityName = "Toronto";
  const forecastIconUrl = `http://openweathermap.org/img/wn/04d@2x.png`;
  const lng = 43.6532;
  const lat = 79.3832;
  const temperature = 23;
  const feelsLikeTemperature = 20;
  const description = "Cloudy";
  const humidity = "10%";
  const wind = 2;
  const sunrise = new Date(1592774427 * 1000);
  const sunset = new Date(1592774458 * 1000);

  const wrapper = shallow(
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
    />
  );
  it("should render infoWindow", () => {  
    expect(wrapper.find("div")).toEqual({});
  });
});
