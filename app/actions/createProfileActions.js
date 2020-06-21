/*
 * Reducer actions related with login
 */
import * as types from "./types";

export function creteProfileRequest(params) {
  return {
    type: types.CREATE_PROFILE_REQUEST,
    params,
  };
}

export function creteProfileFailed(status) {
  return {
    type: types.CREATE_PROFILE_FAILED,
    status,
  };
}

export function creteProfileResponse(response, profileData, status) {
  return {
    type: types.CREATE_PROFILE_RESPONSE,
    response,
    profileData,
    status,
  };
}

export function updateProfileCreateStatus() {
  return {
    type: types.UPDATE_SIGN_UP_LAST_SCREEN_STATUS,
  };
}
