/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isLoading: false,
};

export const loadingReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state) {
    return { ...state, isLoading: true };
  },
  [types.DISABLE_LOADER](state) {
    return { ...state, isLoading: false };
  },
});
