import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function verifyOTP(data) {
  return Api(
    ApiConstants.VERIFY_OTP ,
    data,
    'post',
    null,
  );
}; 