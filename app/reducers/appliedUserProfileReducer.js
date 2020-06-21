import createReducer from "app/lib/createReducer";
import * as types from "app/actions/types";

const initialState = {
  userProfile: [],
  status: false,
};

export const appliedUserProfileReducer = createReducer(initialState, {
  [types.APPLIED_PROFILE_RESPONSE](state, action) {
    return { ...state, userProfile: action.response, status: true };
  },
  [types.APPLIED_PROFILE_FAILED](state) {
    return { ...state, userProfile: [], status: false };
  },
});
