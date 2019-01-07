import { delay, END, eventChannel } from 'redux-saga';
import { all, call, put, select, take } from 'redux-saga/effects';

import { SONOS_DEVICE_DISCOVERY_TIMEOUT_MS, SONOS_DEVICE_DISCOVERY_REFRESH_INTERVAL_M } from 'babel-dotenv';

import * as types from './constants';

import Sonos from './index';

export const getSonos = state => state.get('sonos');

const SONOS_DEVICE_DISCOVERY_TIMEOUT_INT = parseInt(SONOS_DEVICE_DISCOVERY_TIMEOUT_MS) || 5000;
const SONOS_DEVICE_DISCOVERY_REFRESH_INTERVAL_M_INT = parseInt(SONOS_DEVICE_DISCOVERY_REFRESH_INTERVAL_M) || 5000;

//
// METHODS

export function* discoverDevices() {
  yield put({ type: types.SONOS_DISCOVER_DEVICES_START });

  const channel = eventChannel(listener => {
    const handleDeviceAvailable = (error, service) => listener(error || service);

    Sonos.startDeviceDiscovery(
      SONOS_DEVICE_DISCOVERY_TIMEOUT_INT,
      handleDeviceAvailable
    );

    const timeout = setTimeout(() => {
      handleDeviceAvailable(END);
    }, SONOS_DEVICE_DISCOVERY_TIMEOUT_INT);

    return () => {
      clearTimeout(timeout);
    };
  });

  try {
    while (true) {
      const service = yield take(channel);

      if (typeof service instanceof Error) {
        yield put({
          type: types.SONOS_DISCOVER_DEVICES_ERROR,
          service
        });
      } else {
        yield put({
          type: types.SONOS_DISCOVER_DEVICES_RESPONSE,
          service
        });
      }
    }
  } catch (e) {
    yield put({ type: types.SONOS_DISCOVER_DEVICES_ERROR });
  } finally {
    yield put({ type: types.SONOS_DISCOVER_DEVICES_FINISH });
  }
}

export function* getTrack() {
  yield put({ type: types.SONOS_GET_CURRENT_TRACK_START });

  const sonos = yield select(getSonos);

  console.log('done');
}

//
// SAGAS

export function* startDiscoverDevicesSaga() {
  while (true) {
    yield call(discoverDevices);
    yield delay(SONOS_DEVICE_DISCOVERY_REFRESH_INTERVAL_M_INT * 60 * 1000);
  }
}

//
// DEFAULT SAGA

export default function* sagas() {
  return yield all([startDiscoverDevicesSaga()]);
}
