//rejectUser

import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function rejectUser(data,token) {
  return Api(
    ApiConstants.REJECT_USER ,
    data,
    'post',
    token,
  );
};