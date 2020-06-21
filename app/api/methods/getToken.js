import TokenApi from '../TokenApi';
import ApiConstants from '../ApiConstants';

export default function getToken() {
   
  return TokenApi(
    ApiConstants.GET_TOKEN ,
    null,
    'post'
  );
};