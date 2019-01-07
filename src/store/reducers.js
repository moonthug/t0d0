import { combineReducers } from 'redux-immutable';

import beers from '../containers/beers/reducer';
import shoppingList from '../containers/shoppingList/reducer';
import ssdp from '../containers/ssdp/reducer';
import todos from '../containers/todos/reducer';
import weather from '../containers/weather/reducer';

import sonos from '../services/sonos/reducer';

const root = combineReducers({
  // Containers
  beers,
  shoppingList,
  ssdp,
  todos,
  weather,
  // Services
  sonos
});

export default root;
