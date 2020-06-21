

import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getJobType(token) {
  return Api(
    ApiConstants.GET_JOB_TYPE ,
    null,
    'post',
    token,
  );
};