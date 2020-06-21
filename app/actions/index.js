// export action creators
import * as loginActions from './loginActions';
import * as navigationActions from './navigationActions';
import * as loadingActions from './loaderActions';
import * as languageReducer from './languageAction';
import * as otpActions from './otpActions';
import * as jobTypeActions from './getJobTypeActions';
import * as createProfileAction from './createProfileActions';
import * as savePostActions from './savePostDataAction';
import * as getTokenAction from './getTokenAction';
import * as getCreatedJobAction from './getCreatedJobAction';
import * as getJobDetails from './getJobDetails';
import * as saveJobAction from './saveJobAction';
import * as hireForJobAction from './hireForJobAction';
import * as appliedUserAction from './appliedUserAction';
import * as appliedUserProfileAction from './appliedUserProfileAction';
import * as rejectUserAction from './rejectUserAction';
import * as qrScanAction from './qrScanAction';

export const ActionCreators = Object.assign(
  {},
  loginActions,
  navigationActions,
  loadingActions,
  languageReducer,
  jobTypeActions,
  otpActions,
  rejectUserAction,
  createProfileAction,
  savePostActions,
  getTokenAction,
  getCreatedJobAction,
  getJobDetails,
  saveJobAction,
  hireForJobAction,
  appliedUserAction,
  appliedUserProfileAction,
  qrScanAction
);
