import { call, put, takeEvery } from 'redux-saga/effects';

import { TODOIST_TEST_TOKEN } from 'babel-dotenv';

import Todoist from '../../services/todoist';

import {
  GET_SHOPPING_LIST,
  GET_SHOPPING_LIST_START,
  GET_SHOPPING_LIST_SUCCESS,
  GET_SHOPPING_LIST_FAIL
} from './constants';

const todoist = new Todoist(TODOIST_TEST_TOKEN);

export function* getShoppingListSaga(action) {
  yield put({ type: GET_SHOPPING_LIST_START });
  try {
    let response = yield call([todoist, 'getTasksByProjectId'], 189858546);
    yield put({
      type: GET_SHOPPING_LIST_SUCCESS,
      shoppingList: response
    });
  } catch (err) {
    yield put({ type: GET_SHOPPING_LIST_FAIL, error: err.message });
  }
}

export default function* sagas() {
  yield takeEvery(GET_SHOPPING_LIST, getShoppingListSaga);
}
