/*
 * Reducer actions related with login
 */
import * as types from './types';

export function requestLogin(data,fromOTP) {
  return {
    type: types.LOGIN_REQUEST,
    data,
    fromOTP
  };
}

export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function otpVerified(userID,usertype){
  return {
    type: types.OTP_VERIFIED,
    userID,
    usertype
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}
