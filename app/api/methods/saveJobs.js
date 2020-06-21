import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function saveJobs(data,token) {
  return Api(
    ApiConstants.SAVE_JOBS ,
    data,
    'post',
    token,
  );
};