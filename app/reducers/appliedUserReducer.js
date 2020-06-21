import createReducer from "app/lib/createReducer";
import * as types from "app/actions/types";

const initialState = {
  appliedUsers: [],
  status: false,
};

export const appliedUserReducer = createReducer(initialState, {
  [types.APPLIED_USER_BY_JOB_RESPONSE](state, action) {
    return { ...state, appliedUsers: action.response, status: true };
  },
  [types.APPLIED_USER_BY_JOB_FAIL](state) {
    return { ...state, appliedUsers: [], status: false };
  },
});
