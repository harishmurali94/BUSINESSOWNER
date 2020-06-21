import createReducer from "app/lib/createReducer";
import * as types from "app/actions/types";

const initialState = {
  isProfileCreated: false,
  boUserId: "",
  profileData: null,
  isSignUpLastScreenShow: false,
};

export const profileReducer = createReducer(initialState, {
  [types.CREATE_PROFILE_RESPONSE](state, action) {
    return {
      ...state,
      isProfileCreated: action.status,
      boUserId: action.response,
      profileData: action.profileData,
    };
  },
  [types.CREATE_PROFILE_FAILED](state, action) {
    return { ...state, isProfileCreated: action.status, boUserId: "" };
  },
  [types.UPDATE_SIGN_UP_LAST_SCREEN_STATUS](state, action) {
    return { ...state, isSignUpLastScreenShow: true };
  },
});
