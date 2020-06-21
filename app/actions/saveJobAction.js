import * as types from "./types";

export function saveJobRequest(params, callback) {
  return {
    type: types.SAVE_JOB_REQUEST,
    params,
    callback,
  };
}

export function saveJobResponse(response,status) {
  return {
    type: types.SAVE_JOB_RESPONSE,
    response,
    status
  };
}

export function saveJobFailed(status) {
  return {
    type: types.SAVE_JOB_FAILED,
    status
  };
}

export function addJob(status) {
  return {
    type:types.ADD_JOB_FROM_HOME,
    status
  }
}
