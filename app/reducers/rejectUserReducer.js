import createReducer from "app/lib/createReducer";
import * as types from "app/actions/types";

const initialState = {
  rejectStatus: false,
};

export const rejectUserReducer = createReducer(initialState, {
  [types.REJECT_USER_RESPONSE](state, action) {
    return {
      ...state,
      rejectStatus: action.status,
    };
  },
  [types.REJECT_USER_FAILED](state, action) {
    return { ...state, rejectStatus: action.status };
  },
});
