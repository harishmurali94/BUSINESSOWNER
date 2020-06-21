import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function createProfile(params,token) {
  return Api(
    ApiConstants.CREATE_PROFILE,
    params,
    'post',
    token,
  );
};