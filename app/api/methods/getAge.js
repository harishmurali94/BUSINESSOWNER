import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getAge(token) {
  return Api(
    ApiConstants.GET_AGE ,
    null,
    'post',
    token,
  );
};