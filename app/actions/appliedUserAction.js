import * as types from './types';

export function getAppliedUserByJob(params) {
    return {
      type: types.APPLIED_USER_BY_JOB,
      params
    };
  }

  export function getAppliedUserByJobResponse(response) {
    return {
      type: types.APPLIED_USER_BY_JOB_RESPONSE,
      response
    };
  }
  export function getAppliedUserByJobFail() {
    return {
      type: types.APPLIED_USER_BY_JOB_FAIL
    };
  }