/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, all, select } from "redux-saga/effects";
import generateArray from "../lib/makeSelect";
import * as savePostActions from "app/actions/savePostDataAction";
import * as createProfileActions from "app/actions/createProfileActions";
import getSalary from "app/api/methods/getSalary";
import getQualifications from "app/api/methods/getQualification";
import getWorkingDays from "app/api/methods/getWorkingDays";
import getExperience from "app/api/methods/getExperience";
import getAge from "app/api/methods/getAge";
import createProfile from "app/api/methods/createProfile";

import * as loaderAction from "app/actions/loaderActions";
import * as navigateActions from "../actions/navigationActions";

// Our worker Saga that logins the user
export default function* createProfileAsync(action) {
  yield put(loaderAction.enableLoader());
  const { userToken } = yield select((state) => state.getTokenReducer);
  try {
    const [
      createProfileResponse,
      salaryResponse,
      workingdaysResponse,
      qualificationResponse,
      experienceResponse,
      getAgeResponse,
    ] = yield all([
      call(createProfile, action.params, userToken),
      call(getSalary, userToken),
      call(getWorkingDays, userToken),
      call(getQualifications, userToken),
      call(getExperience, userToken),
      call(getAge, userToken),
    ]);

    if (createProfileResponse.Status === "Success") {
      const ageArray = generateArray(getAgeResponse.Data);

      yield put(
        createProfileActions.creteProfileResponse(
          createProfileResponse.Data,
          action.params,
          true
        )
      );
      yield put(savePostActions.saveAge(ageArray));
      yield put(savePostActions.saveSalary(generateArray(salaryResponse.Data)));
      yield put(
        savePostActions.saveWorkingDays(generateArray(workingdaysResponse.Data))
      );
      yield put(
        savePostActions.saveQualifications(
          generateArray(qualificationResponse.Data)
        )
      );
      yield put(
        savePostActions.saveExperience(generateArray(experienceResponse.Data))
      );

      //   yield call(navigateActions.navigateToBoarding());
      yield put(loaderAction.disableLoader());
    } else if (createProfileResponse.Status === "Failure") {
      yield put(createProfileActions.creteProfileFailed(false));
    }
  } catch (error) {
    yield put(loaderAction.disableLoader());
    yield put(createProfileActions.creteProfileFailed(false));
    console.log("error in otp saga", error);
  }
}
