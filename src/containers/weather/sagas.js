import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  DARKSKY_API_KEY,
  WEATHER_LAT,
  WEATHER_LON,
  WEATHER_CACHE_TTL_M,
  WEATHER_REFRESH_INTERVAL_M
} from 'babel-dotenv';

import DarkSky from '../../services/darksky';

import * as types from './constants';

// eslint-disable-next-line prettier/prettier
const WEATHER_REFRESH_INTERVAL_M_INT = parseInt(WEATHER_REFRESH_INTERVAL_M) || 1000 * 60 * 15;
const WEATHER_CACHE_TTL_M_INT = parseInt(WEATHER_CACHE_TTL_M) || 1000 * 60 * 15;

//
// Client

const darksky = new DarkSky(DARKSKY_API_KEY, {
  cache: {
    enabled: true,
    ns: 't0d0:weather',
    ttl: 60 * WEATHER_CACHE_TTL_M_INT
  }
});


//
// SAGAS

export function* getWeather(coords) {
  yield put({ type: types.GET_WEATHER_START });
  try {
    let response = yield call([darksky, 'getWeather'], coords.lat, coords.lon);
    yield put({
      type: types.GET_WEATHER_SUCCESS,
      weather: response
    });
  } catch (err) {
    yield put({ type: types.GET_WEATHER_FAIL, error: err.message });
  }
}

// REFRESH SAGA

export function* startWeatherSaga() {
  while (true) {
    yield call(getWeather, { lat: WEATHER_LAT, lon: WEATHER_LON });
    yield delay(WEATHER_REFRESH_INTERVAL_M_INT * 60 * 1000);
  }
}

//
// DEFAULT SAGA

export default function* sagas() {
  yield startWeatherSaga();
}
