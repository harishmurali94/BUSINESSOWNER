import { put, call, select, delay } from "redux-saga/effects";
import qrScan from "app/api/methods/qrScan";
import * as qrScanAction from "app/actions/qrScanAction";
import * as loaderAction from "app/actions/loaderActions";
import * as navigateActions from '../actions/navigationActions';

// Our worker Saga that logins the user
export default function* rejectUserAsync(action) {
  const { userToken } = yield select((state) => state.getTokenReducer);
  // let userToken = "5t58B2ID0Zy8xjkNwUqKoPLRCLQqLuU7HdBuGzF1mv6ep3q7YWfw6WDBXgLtZ7IErB9F0n-HODMM0qOQtD0lyQGdHuKnpLrHCDzAeZPMN2ZsZ9LNeKdRaiy1CX8CqGVyXe76ZaDYgvhVCxG-WNDMCjP0Nr8MXTID6DHG0OTFp-Z6DllGEMGFhzBYEXgs58XHp5hWthbIHTme2p6mxfGMu3t_GoGrk1jB7juJLa8bgxE";
  yield put(loaderAction.enableLoader());
  try {
    console.warn('cadasdasd',action.params)

    const response = yield call(qrScan, action.params, userToken);
    yield put(loaderAction.disableLoader({}));
    if (response.Status === "Success") {
      yield put(qrScanAction.qrScanResponse(true));
      navigateActions.navigateToJobList();
    } else if (response.Status === "Failure") {
      yield put(qrScanAction.qrScanFailed(false));
      yield put(loaderAction.disableLoader({}));
      yield delay(100);
      alert('Invalid QrCode')
    }
  } catch (error) {
    yield put(qrScanAction.qrScanFailed(false));
    yield put(loaderAction.disableLoader({}));
  }
}
