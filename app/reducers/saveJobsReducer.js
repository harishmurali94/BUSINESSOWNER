import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  jobSaved:false,
  userID:""
};

export const saveJobsReducer = createReducer(initialState, {
  [types.SAVE_JOB_RESPONSE](state, action) {
    return { ...state, jobSaved: true };
  },
  [types.SAVE_JOB_FAILED](state,action){
      return{...state,jobSaved:false}
  },
  [types.ADD_JOB_FROM_HOME](state,action){
    return{...state,jobSaved:false}
  }
});