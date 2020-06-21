/*
 * Reducer actions related with login
 */
import * as types from './types';

export function createdJobsRequest(params) {
  return {
    type: types.CREATED_JOB_REQUEST,
    params
  };
}

export function createJobsResponse(response) {
  return {
    type: types.CREATED_JOB_RESPONSE,
    response
  };
}

export function createdJobsFailed() {
  return {
    type: types.CREATED_JOB_FAILED
  };
}

export function setHomePage(){
  return {
    type:types.SET_HOME_PAGE
  }
}

