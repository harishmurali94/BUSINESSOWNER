import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getQualifications(token) {
  return Api(
    ApiConstants.GET_QUALIFICATIONS ,
    null,
    'post',
    token,
  );
};