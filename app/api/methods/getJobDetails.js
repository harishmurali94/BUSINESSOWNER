import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getJobDetails(data,token) {
  return Api(
    ApiConstants.GET_JOB_DETAILS ,
    data,
    'post',
    token,
  );
};