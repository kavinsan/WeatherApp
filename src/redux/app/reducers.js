import initialState from "./initialState";

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CITIES":
      return state.set("cities", action.payload);
    case "SET_CITIES_FORECASTS":
      return state.set("citiesForecasts", action.payload)
    default:
      return state;
  }
};

export default AppReducer;
