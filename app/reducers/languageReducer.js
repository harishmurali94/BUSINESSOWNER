import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  language : "en",
};

export const languageReducer = createReducer(initialState, {
  [types.CHANGE_LANGUAGE](state,action) {
    return { ...state, language: action.language };
  }
});