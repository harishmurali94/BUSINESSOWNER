import * as types from './types';



export function getJobDetailRequest(params) {
  return {
    type: types.JOB_DETAILS_REQUEST,
    params,
  };
};

export function getJobDetailResponse(response) {
  return {
    type: types.JOB_DETAILS_RESPONSE,
    response,
  };
}



export function getJobDetailFailed() {
  return {
    type: types.JOB_DETAILS_FAILED,
  };
}

