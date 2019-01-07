import { call, put, takeEvery } from 'redux-saga/effects';

import { TRELLO_API_KEY, TRELLO_TOKEN } from 'babel-dotenv';

import Trello from '../../services/trello';

import {
  GET_CARDS_FOR_BOARD,
  GET_CARDS_FOR_BOARD_START,
  GET_CARDS_FOR_BOARD_SUCCESS,
  GET_CARDS_FOR_BOARD_FAIL
} from './constants';

//
// Client
const trello = new Trello(
  TRELLO_API_KEY,
  TRELLO_TOKEN
);

//
// SAGAS

export function* getCardsForBoardSaga(action) {
  yield put({ type: GET_CARDS_FOR_BOARD_START });
  try {
    const response = yield call([trello, 'getBoardField'], action.id, 'cards');
    yield put({
      type: GET_CARDS_FOR_BOARD_SUCCESS,
      cards: response
    });
  } catch (err) {
    yield put({ type: GET_CARDS_FOR_BOARD_FAIL, error: err.message });
  }
}

//
// DEFAULT SAGA

export default function* sagas() {
  yield takeEvery(GET_CARDS_FOR_BOARD, getCardsForBoardSaga);
}
