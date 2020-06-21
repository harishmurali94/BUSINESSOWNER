import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function getExperience(token) {
  return Api(
    ApiConstants.GET_EXPERIENCE ,
    null,
    'post',
    token,
  );
};