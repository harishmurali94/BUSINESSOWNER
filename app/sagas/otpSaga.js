import { put, call, all, select } from "redux-saga/effects";
import verifyOTP from "app/api/methods/verifyOTP";
import getJobType from "app/api/methods/getJobType";
import getToken from "app/api/methods/getToken";
import * as loaderAction from "app/actions/loaderActions";
import * as loginActions from "../actions/loginActions";
import * as getTokenAction from "../actions/getTokenAction";
import * as getJobTypeActions from "app/actions/getJobTypeActions";
import * as navigateActions from "../actions/navigationActions";

import * as createProfileActions from "../actions/createProfileActions";
import * as savePostActions from "app/actions/savePostDataAction";
import generateArray from "../lib/makeSelect";
import getSalary from "app/api/methods/getSalary";
import getQualifications from "app/api/methods/getQualification";
import getWorkingDays from "app/api/methods/getWorkingDays";
import getExperience from "app/api/methods/getExperience";
import getAge from "app/api/methods/getAge";

// Our worker Saga that logins the user
export default function* otpAsync(action) {
  yield put(loaderAction.enableLoader());

  try {
    const [otpResponse, jobTypeResponse, tokenResponse] = yield all([
      call(verifyOTP, action.data),
      call(getJobType),
      call(getToken),
    ]);
    if (
      otpResponse.Status === "Failure" &&
      jobTypeResponse.Status === "Success"
    ) {
      const jobTypes = jobTypeResponse.Data.map((item) => {
        item.isSelected = false;
        return item;
      });

      yield put(getTokenAction.saveToken(tokenResponse.access_token));
      yield put(getJobTypeActions.saveJobTypes(jobTypes));
      yield put(loginActions.otpVerified());
      yield put(loaderAction.disableLoader());
    } else if (otpResponse.Status === "Success") {
      if (otpResponse && otpResponse.Data[0].userType == 1) {
        const userToken = tokenResponse.access_token;
        const [
          salaryResponse,
          workingdaysResponse,
          qualificationResponse,
          experienceResponse,
          getAgeResponse,
        ] = yield all([
          call(getSalary, userToken),
          call(getWorkingDays, userToken),
          call(getQualifications, userToken),
          call(getExperience, userToken),
          call(getAge, userToken),
        ]);

        const ageArray = generateArray(getAgeResponse.Data);
        yield put(savePostActions.saveAge(ageArray));
        yield put(
          savePostActions.saveSalary(generateArray(salaryResponse.Data))
        );
        yield put(
          savePostActions.saveWorkingDays(
            generateArray(workingdaysResponse.Data)
          )
        );
        yield put(
          savePostActions.saveQualifications(
            generateArray(qualificationResponse.Data)
          )
        );
        yield put(
          savePostActions.saveExperience(generateArray(experienceResponse.Data))
        );

        const jobTypes = jobTypeResponse.Data.map((item) => {
          item.isSelected = false;
          return item;
        });

        yield put(getTokenAction.saveToken(tokenResponse.access_token));
        yield put(getJobTypeActions.saveJobTypes(jobTypes));
        yield put(
          loginActions.otpVerified(
            otpResponse.Data[0].userId,
            otpResponse.Data[0].userType
          )
        );
        yield put(createProfileActions.updateProfileCreateStatus());
        yield put(createProfileActions.creteProfileResponse(null, null, true));

        yield put(loaderAction.disableLoader());
      } else {
        const jobTypes = jobTypeResponse.Data.map((item) => {
          item.isSelected = false;
          return item;
        });

        yield put(getTokenAction.saveToken(tokenResponse.access_token));
        yield put(getJobTypeActions.saveJobTypes(jobTypes));
        yield put(
          loginActions.otpVerified(
            otpResponse.Data[0].userId,
            otpResponse.Data[0].userType
          )
        );

        yield call(navigateActions.navigateToBoarding());
        yield put(loaderAction.disableLoader());
      }
    }
  } catch (error) {
    console.warn("ERROR!!!", error);
    yield put(loaderAction.disableLoader());
  }
}