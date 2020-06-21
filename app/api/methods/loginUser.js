import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function loginUser(data) {
  return Api(
    ApiConstants.GET_OTP ,
    data,
    'post',
    null,
  );
};