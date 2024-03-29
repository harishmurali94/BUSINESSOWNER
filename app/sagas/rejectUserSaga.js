import { put, call, select } from "redux-saga/effects";
import rejectUser from "app/api/methods/rejectUser";
import * as rejectUserAction from "app/actions/rejectUserAction";
import * as loaderAction from "app/actions/loaderActions";
import * as navigateActions from '../actions/navigationActions';

// Our worker Saga that logins the user
export default function* rejectUserAsync(action) {
  const { userToken } = yield select((state) => state.getTokenReducer);
  // let userToken = "5t58B2ID0Zy8xjkNwUqKoPLRCLQqLuU7HdBuGzF1mv6ep3q7YWfw6WDBXgLtZ7IErB9F0n-HODMM0qOQtD0lyQGdHuKnpLrHCDzAeZPMN2ZsZ9LNeKdRaiy1CX8CqGVyXe76ZaDYgvhVCxG-WNDMCjP0Nr8MXTID6DHG0OTFp-Z6DllGEMGFhzBYEXgs58XHp5hWthbIHTme2p6mxfGMu3t_GoGrk1jB7juJLa8bgxE";
  yield put(loaderAction.enableLoader());

  try {
    const response = yield call(rejectUser, action.params, userToken);

    yield put(loaderAction.disableLoader({}));
    if (response.Status === "Success") {
      navigateActions.navigateToJobList();
      yield put(rejectUserAction.rejectUserResponse( true));
    } else if (response.Status === "Failure") {
      yield put(rejectUserAction.rejectUserFailed(false));
      yield put(loaderAction.disableLoader({}));
    }
  } catch (error) {
    yield put(rejectUserAction.rejectUserFailed(false));
    yield put(loaderAction.disableLoader({}));
    console.log("error in post job", error);
  }
}
