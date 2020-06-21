import { put, call, select } from "redux-saga/effects";
import getAppliedUserJob from "app/api/methods/getAppliedUserJob";
import * as appliedUserAction from "app/actions/appliedUserAction";
import * as loaderAction from "app/actions/loaderActions";
// import * as navigateActions from '../actions/navigationActions';

export default function* getJobAsync(action) {
  const { userToken } = yield select((state) => state.getTokenReducer);
  yield put(loaderAction.enableLoader());

  try {
    const response = yield call(getAppliedUserJob, action.params, userToken);
    yield put(loaderAction.disableLoader({}));
    console.warn("RESPONSE", response);

    if (response.Status === "Success") {
        yield put(appliedUserAction.getAppliedUserByJobResponse(response.Data));
    } else if (response.Status === "Failure") {
       yield put(appliedUserAction.getAppliedUserByJobFail());
      yield put(loaderAction.disableLoader({}));
    }
  } catch (error) {
     yield put(appliedUserAction.getAppliedUserByJobFail());
    yield put(loaderAction.disableLoader({}));
    console.log("error in get applied user jobs", error);
  }
}
