/**
 *  Redux saga class init
 */
import { takeEvery, takeLatest, all } from "redux-saga/effects";
import * as types from "../actions/types";
import loginSaga from "./loginSaga";
import otpSaga from "./otpSaga";
import getCreatedJobSaga from "./getCreatedJobSaga";
import createProfileSaga from "./createProfileSaga";
import getJobDetailsSaga from "./getJobDetailsSaga";
import saveJobSaga from "./saveJobSaga";
import getAppliedUserJobSaga from "./getAppliedUserJobSaga";
import hireJobSaga from "./hireJobSaga";
import appliedUserProfileSaga from "./appliedUserProfileSaga";
import rejectUserSaga from "./rejectUserSaga";
import qrScanSaga from "./qrScanSaga";

export default function* watch() {
  yield all([takeEvery(types.LOGIN_REQUEST, loginSaga)]);
  yield all([takeLatest(types.OTP_REQUEST, otpSaga)]);
  yield all([takeLatest(types.CREATE_PROFILE_REQUEST, createProfileSaga)]);
  yield all([takeLatest(types.CREATED_JOB_REQUEST, getCreatedJobSaga)]);
  yield all([takeLatest(types.JOB_DETAILS_REQUEST, getJobDetailsSaga)]);
  yield all([takeLatest(types.SAVE_JOB_REQUEST, saveJobSaga)]);
  yield all([takeLatest(types.APPLIED_USER_BY_JOB, getAppliedUserJobSaga)]);
  yield all([takeLatest(types.HIRE_REQUEST, hireJobSaga)]);
  yield all([takeLatest(types.APPLIED_PROFILE_REQUEST, appliedUserProfileSaga)]);
  yield all([takeLatest(types.REJECT_USER_REQUEST, rejectUserSaga)]);
  yield all([takeLatest(types.QR_CODE_REQUEST, qrScanSaga)]);
}
