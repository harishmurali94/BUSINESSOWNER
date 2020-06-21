import ApiConstants from './ApiConstants';

export default function tokenApi(path, datas, method) {
  let params = {
    grant_type: 'password',
    username: 9123456721,
  };

  function urlEncode() {
    const formBody = Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    );
    return formBody.join('&');
  }

  let options;
  options = Object.assign(
    { method: method },
    params ? { body: urlEncode(params) } : null,
  );
  return fetch(ApiConstants.BASE_URL + path, options)
    .then(resp => resp.json())
    .then(json => json)
    .catch(error => error);
}
