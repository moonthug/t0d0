import * as types from './constants';

const initialState = {
  isSearching: false,
  isSearchingComplete: false,
  isFailed: false,
  errors: [],
  services: [],
  currentTrack: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SONOS_DISCOVER_DEVICES_START:
      return {
        ...state,
        isSearching: true,
        isSearchingComplete: false
      };

    case types.SONOS_DISCOVER_DEVICES_FINISH:
      return {
        ...state,
        isSearching: false,
        isSearchingComplete: true
      };

    case types.SONOS_DISCOVER_DEVICES_RESPONSE:
      return {
        ...state,
        services: [
          ...state.services,
          action.service
        ]
      };

    default:
      return state;
  }
};

export default reducer;
