import * as types from "./types";

export function rejectUserRequest(params) {
  return {
    type: types.REJECT_USER_REQUEST,
    params
  };
}

export function rejectUserResponse(status) {
  return {
    type: types.REJECT_USER_RESPONSE,
    status
  };
}

export function rejectUserFailed(status) {
  return {
    type: types.REJECT_USER_FAILED,
    status
  };
}


