import { select, takeEvery } from 'redux-saga/effects';

export function* logger(action) {
  const state = yield select();
  console.log('action', action.type);
}

export default function* sagas() {
  // DEBUG
  //yield takeEvery('*', logger);
}
