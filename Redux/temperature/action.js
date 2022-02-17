import axios from "axios";
import {
  FETCH_TEMP_FAILURE,
  FETCH_TEMP_REQUEST,
  FETCH_TEMP_SUCCESS,
} from "./type";

export const fetchTemp = (city) => {
  return async (dispatch) => {
    dispatch(fetchTempRequest());
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8da6d78b734f196a2479187e96005f1d`
      )
      .then((response) => {
        const temp = response.data.main; // response.data.main.temp;
        // console.log("########", response.data.main);
        dispatch(fetchTempSuccess(temp));
      })
      .catch((error) => {
        dispatch(fetchTempFailure(error.message));
      });
  };
};

export const fetchTempRequest = (city) => {
  return {
    type: FETCH_TEMP_REQUEST,
    payload: city,
  };
};

export const fetchTempSuccess = (temp) => {
  return {
    type: FETCH_TEMP_SUCCESS,
    payload: temp,
  };
};

export const fetchTempFailure = (error) => {
  return {
    type: FETCH_TEMP_FAILURE,
    payload: error,
  };
};
