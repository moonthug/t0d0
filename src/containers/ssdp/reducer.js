import isEqual from 'lodash.isequal';

import * as types from './constants';

const initialState = {
  isSearching: false,
  isFailed: false,
  errors: [],
  services: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SSDP_SEARCH_RESPONSE:
      const newState = {
        ...state,
        services: {
          ...state.services
        }
      };

      if (newState.services.hasOwnProperty(action.response.st) === false) {
        newState.services[action.response.st] = [];
      }

      // Prevent duplicates
      const exists = newState.services[action.response.st].find(item => isEqual(item.ip.address, action.response.ip.address));
      if (exists === undefined) {
        newState.services[action.response.st].push(action.response);
      }

      return newState;
    default:
      return state;
  }
};

export default reducer;
