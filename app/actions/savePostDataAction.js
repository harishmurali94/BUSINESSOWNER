import * as types from './types';

export function saveAge(response) {
    return {
      type: types.SAVE_AGE,
      response
    };
  }
  
  export function saveSalary(response) {
    return {
      type: types.SAVE_SALARY,
      response
    };
  }
  
  export function saveWorkingDays(response) {
    return {
      type: types.SAVE_WORKING_DAYS,
      response
    };
  }

  export function saveQualifications(response) {
    return {
      type: types.SAVE_QUALIFICATION,
      response
    };
  }

  export function saveExperience(response) {
    return {
      type: types.SAVE_EXPERIENCE,
      response
    };
  }