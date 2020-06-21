import * as types from './types';

export function requestOtp(data) {
    return {
      type: types.OTP_REQUEST,
      data
    };
  }
  
  export function otpFailed() {
    return {
      type: types.LOGIN_FAILED,
    };
  }
  
  export function otpResponse(response) {
    return {
      type: types.LOGIN_RESPONSE,
      response,
    };
  }