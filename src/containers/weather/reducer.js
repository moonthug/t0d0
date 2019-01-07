import * as types from './constants';

const initialState = {
  isLoading: false,
  isLoaded: false,
  isFailed: false,
  errors: [],
  data: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_WEATHER_START:
      return {...state, isLoaded: false, isLoading: true, };

    case types.GET_WEATHER_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        isFailed: false,
        data: { ...action.weather }
      };

    case types.GET_WEATHER_FAIL:
      return { ...state, isLoading: false, isFailed: true};

    default:
      return state;
  }
};

export default reducer;
