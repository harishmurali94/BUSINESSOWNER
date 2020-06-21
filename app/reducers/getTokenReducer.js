import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
 userToken:''
};

export const getTokenReducer = createReducer(initialState, {

  [types.SET_TOKEN](state, action) {
    return { ...state, userToken:action.token };
  },
});