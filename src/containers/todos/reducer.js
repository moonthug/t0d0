import * as types from './constants';

const reducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_CARDS_FOR_BOARD_SUCCESS:
      return [...state, ...action.cards];



    default:
      return state;
  }
};

export default reducer;
