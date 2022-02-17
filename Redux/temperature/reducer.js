import {
  FETCH_TEMP_FAILURE,
  FETCH_TEMP_REQUEST,
  FETCH_TEMP_SUCCESS,
} from "./type";

const initialState = {
  loading: false,
  temp: [], // temp:""
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEMP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TEMP_SUCCESS:
      return {
        loading: false,
        temp: action.payload,
        error: "",
      };
    case FETCH_TEMP_FAILURE:
      return {
        loading: false,
        TEMP: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
