import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getSalary(token) {
  return Api(
    ApiConstants.GET_SALARY_TYPES ,
    null,
    'post',
    token,
  );
};