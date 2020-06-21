import { put, call, select } from "redux-saga/effects";
import getAppliedUserProfile from "app/api/methods/getAppliedUserProfile";
import * as appliedUserProfileAction from "app/actions/appliedUserProfileAction";
import * as loaderAction from "app/actions/loaderActions";
// import * as navigateActions from '../actions/navigationActions';

// Our worker Saga that logins the user
export default function* appliedUserProfileAsync(action) {
  const { userToken } = yield select((state) => state.getTokenReducer);
  yield put(loaderAction.enableLoader());

  try {
    const response = yield call(
      getAppliedUserProfile,
      action.params,
      userToken
    );
    yield put(loaderAction.disableLoader({}));
    if (response.Status === "Success") {
      yield put(appliedUserProfileAction.appliedProfileResponse(response.Data));
    } else if (response.Status === "Failure") {
      yield put(appliedUserProfileAction.appliedProfileFailed());
      yield put(loaderAction.disableLoader({}));
    }
  } catch (error) {
    yield put(appliedUserProfileAction.appliedProfileFailed());
    yield put(loaderAction.disableLoader({}));
    console.log("error in get jobs", error);
  }
}
