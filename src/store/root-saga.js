import { all } from 'redux-saga/effects';

import appSagas from '../containers/app/sagas';
import beersSagas from '../containers/beers/sagas';
import shoppingListSagas from '../containers/shoppingList/sagas';
import ssdpSagas from '../containers/ssdp/sagas';
import todosSagas from '../containers/todos/sagas';
import weatherSagas from '../containers/weather/sagas';

import sonosSagas from '../services/sonos/sagas';

// import watchers from other files
export default function* rootSaga() {
  yield all([
    appSagas(),
    beersSagas(),
    shoppingListSagas(),
    ssdpSagas(),
    todosSagas(),
    weatherSagas(),
    sonosSagas()
  ]);
}
