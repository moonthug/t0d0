import * as types from './constants';

export const getCardsForBoard = id => ({
  type: types.GET_CARDS_FOR_BOARD,
  id
});
