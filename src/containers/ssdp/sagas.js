import { eventChannel, takeEvery } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

import * as types from './constants';

import Ssdp from '../../services/ssdp';

const ssdp = new Ssdp();

export function* startSearchResponseListener(action) {
  const channel = eventChannel(listener => {
    const handleSearchResponse = (headers, statusCode, rinfo) => {
      listener({ st: headers.ST, server: headers.SERVER, ip: rinfo });
    };

    ssdp.search(action.urn);
    ssdp.on('response', handleSearchResponse);

    return () => ssdp.off('response', handleSearchResponse);
  });

  while (true) {
    const response = yield take(channel);
    yield put({ type: types.SSDP_SEARCH_RESPONSE, response });
  }
}

export default function* sagas() {
  yield takeEvery(types.SSDP_SEARCH, startSearchResponseListener);
}
