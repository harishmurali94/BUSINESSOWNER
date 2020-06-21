import * as types from './types';



export function getTokenRequest() {
  return {
    type: types.GET_TOKEN
  };
};

export function saveToken(token){
    return{
        type: types.SET_TOKEN,
        token
    }
}
