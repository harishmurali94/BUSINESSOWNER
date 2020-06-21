import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getWorkingDays(token) {
  return Api(
    ApiConstants.GET_WORKING_DAYS ,
    null,
    'post',
    token,
  );
};