import * as types from './constants';

export const search = urn => ({
  type: types.SSDP_SEARCH,
  urn
});

export const searchResponse = response => ({
  type: types.SSDP_SEARCH_RESPONSE,
  response
});
