import * as types from './types';

export function appliedProfileRequest(params) {
  return {
    type: types.APPLIED_PROFILE_REQUEST,
    params
  };
}

export function appliedProfileFailed() {
  return {
    type: types.APPLIED_PROFILE_FAILED
  };
}

export function appliedProfileResponse(response) {
  return {
    type: types.APPLIED_PROFILE_RESPONSE,
    response
  };
}