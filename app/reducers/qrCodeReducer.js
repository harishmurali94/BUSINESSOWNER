import createReducer from "app/lib/createReducer";
import * as types from "app/actions/types";

const initialState = {
  qrStatus: false,
};

export const qrCodeReducer = createReducer(initialState, {
  [types.QR_CODE_RESPONSE](state, action) {
    return {
      ...state,
      qrStatus: action.status,
    };
  },
  [types.QR_CODE_FAILED](state, action) {
    return { ...state, qrStatus: action.status };
  },
});
