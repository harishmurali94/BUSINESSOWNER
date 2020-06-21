/* Login Reducer
 * handles login states in the app
 */
import createReducer from "app/lib/createReducer";
import * as types from "app/actions/types";

const initialState = {
  numberVerified: false,
  deviceRegId: "",
  mobileNumber: "",
  countryCode: "",
  otpVerified: false,
  tempUserId: "",
  usertype: "",
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      numberVerified: true,
      otpVerified: false,
      deviceRegId: action.response.deviceRegId,
      mobileNumber: action.response.mobileNumber,
      countryCode: action.response.countryCode,
    };
  },
  [types.OTP_VERIFIED](state, action) {
    return {
      ...state,
      otpVerified: true,
      tempUserId: action.userID,
      usertype: action.usertype,
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      numberVerified: false,
      otpVerified: false,
      tempUserId: "",
      usertype: "",
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      numberVerified: false,
    };
  },
});
