import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  ageData: [],
  salaryData:[],
  experienceData:[],
  qualificationData:[],
  workingDaysData:[]
};

export const postJobDataReducer = createReducer(initialState, {
  [types.SAVE_AGE](state, action) {
    return { ...state, ageData: action.response };
  },
  [types.SAVE_SALARY](state, action) {
    return { ...state, salaryData: action.response };
  },
  [types.SAVE_EXPERIENCE](state, action) {
    return { ...state, experienceData: action.response };
  },
  [types.SAVE_QUALIFICATION](state, action) {
    return { ...state, qualificationData: action.response };
  },
  [types.SAVE_WORKING_DAYS](state, action) {
    return { ...state, workingDaysData: action.response };
  },
});