import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  jobDetails: [],
};

export const getJobDetailReducer = createReducer(initialState, {
  [types.JOB_DETAILS_RESPONSE](state, action) {
    return { ...state, jobDetails: action.response };
  },
});
