// /api/BussinessOwner/getCreatedJob

import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getJobPosted(params,token) {
  return Api(
    ApiConstants.GET_JOB_POSTED ,
    params,
    'post',
    token,
  );
};