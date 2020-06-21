import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getHireJob(data,token) {
  return Api(
    ApiConstants.GET_HIRE_JOB ,
    data,
    'post',
    token,
  );
};