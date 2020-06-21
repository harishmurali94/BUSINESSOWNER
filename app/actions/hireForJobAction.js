import * as types from './types';

export function requestHire(params) {
    return {
      type: types.HIRE_REQUEST,
      params
    };
  }
  
  export function responseHire(status) {
    return {
      type: types.HIRE_RESPONSE,
      status
    };
  }
  
  export function failedHire(status) {
    return {
      type: types.HIRE_FAILED,
      status
    };
  }