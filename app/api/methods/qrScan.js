//rejectUser

import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function qrScan(data,token) {
  return Api(
    ApiConstants.QR_CODE ,
    data,
    'post',
    token,
  );
};