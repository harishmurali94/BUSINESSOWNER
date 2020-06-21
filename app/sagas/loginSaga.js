import { put, call, select } from 'redux-saga/effects';
import loginUser from 'app/api/methods/loginUser';
import * as loginActions from 'app/actions/loginActions';
import * as loaderAction from 'app/actions/loaderActions';
import * as navigateActions from '../actions/navigationActions';

// Our worker Saga that logins the user
export default function* loginAsync(action) {
  yield put(loaderAction.enableLoader());

  try {
    const response = yield call(loginUser, action.data);
    yield put(loaderAction.disableLoader({}));
    if (response.Status === 'Success') {
      yield put(loginActions.onLoginResponse(action.data));
       if(!action.fromOTP)yield call(navigateActions.navigateToHome());
    } else if (response.Status === 'Failure') {
     
       yield put(loaderAction.disableLoader({}));
    }
  } catch (error) {
    yield put(loaderAction.disableLoader({}));
    console.log('error in number verification', error);
    
  }
}
