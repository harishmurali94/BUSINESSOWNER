import createReducer from "app/lib/createReducer";
import * as types from "app/actions/types";

const initialState = {
  jobsPosted: [],
  jobFailed: false,
  homeStatus:false
};

export const createdJobsReducer = createReducer(initialState, {
  [types.CREATED_JOB_RESPONSE](state, action) {
    return { ...state, jobsPosted: action.response, jobFailed: false };
  },
  [types.CREATE_PROFILE_FAILED](state, action) {
    return { ...state, jobFailed: true };
  },
  [types.SET_HOME_PAGE](state, action) {
    return { ...state, homeStatus: true };
  },
});