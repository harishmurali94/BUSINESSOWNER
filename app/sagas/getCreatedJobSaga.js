import { put, call, select } from 'redux-saga/effects';
import getJobPosted from 'app/api/methods/getJobPosted';
import * as getCreatedJobAction from 'app/actions/getCreatedJobAction';
import * as loaderAction from 'app/actions/loaderActions';
// import * as navigateActions from '../actions/navigationActions';

// Our worker Saga that logins the user
export default function* getJobAsync(action) {
  const {userToken} = yield select(
    state => state.getTokenReducer,
  );
  // let userToken = "5t58B2ID0Zy8xjkNwUqKoPLRCLQqLuU7HdBuGzF1mv6ep3q7YWfw6WDBXgLtZ7IErB9F0n-HODMM0qOQtD0lyQGdHuKnpLrHCDzAeZPMN2ZsZ9LNeKdRaiy1CX8CqGVyXe76ZaDYgvhVCxG-WNDMCjP0Nr8MXTID6DHG0OTFp-Z6DllGEMGFhzBYEXgs58XHp5hWthbIHTme2p6mxfGMu3t_GoGrk1jB7juJLa8bgxE";
  yield put(loaderAction.enableLoader());

  try {
    const response = yield call(getJobPosted, action.params,userToken);
    yield put(loaderAction.disableLoader({}));
    if (response.Status === 'Success') {
      yield put(getCreatedJobAction.createJobsResponse(response.Data));
    } else if (response.Status === 'Failure') {
        yield put(getCreatedJobAction.createdJobsFailed());
       yield put(loaderAction.disableLoader({}));
    }
  } catch (error) {
    yield put(getCreatedJobAction.createdJobsFailed());
    yield put(loaderAction.disableLoader({}));
    console.log('error in get jobs', error);
    
  }
}
