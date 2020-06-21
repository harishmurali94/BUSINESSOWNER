import * as types from './types';



export function saveJobTypes(response) {
  return {
    type: types.GET_JOB_TYPES,
    response,
  };
}

export function jobTypeFailed() {
  return {
    type: types.FAILURE_JOB_TYPES,
  };
}
