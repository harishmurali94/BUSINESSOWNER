/*
 * combines all th existing reducers
 */
import * as loadingReducer from "./loadingReducer";
import * as loginReducer from "./loginReducer";
import * as jobTypeReducer from "./getJobTypeReducer";
import * as postDataReducer from "./savePostDataReducer";
import * as getTokenReducer from "./getTokenReducer";
import * as profileReducer from "./profileReducer";
import * as getCreatedJobReducer from "./getCreatedJobReducer";
import * as jobDetailsReducer from "./getJobDetailreducer";
import * as saveJobsReducer from "./saveJobsReducer";
import * as jobHireReducer from "./jobHireReducer";
import * as appliedUserReducer from "./appliedUserReducer";
import * as appliedUserProfileReducer from "./appliedUserProfileReducer";
import * as rejectUserReducer from "./rejectUserReducer";
import * as qrCodeReducer from "./qrCodeReducer";

export default Object.assign(
  loginReducer,
  getTokenReducer,
  loadingReducer,
  jobTypeReducer,
  postDataReducer,
  getCreatedJobReducer,
  jobDetailsReducer,
  profileReducer,
  saveJobsReducer,
  jobHireReducer,
  appliedUserReducer,
  appliedUserProfileReducer,
  rejectUserReducer,
  qrCodeReducer
);
