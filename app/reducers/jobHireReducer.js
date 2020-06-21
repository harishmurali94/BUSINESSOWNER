import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
 hireJobStatus:false
};

export const jobHireReducer = createReducer(initialState, {
  [types.HIRE_RESPONSE](state, action) {
    return { ...state, hireJobStatus: action.status };
  },
  [types.HIRE_FAILED](state,action){
      return{...state,hireJobStatus: action.status}
  }
});