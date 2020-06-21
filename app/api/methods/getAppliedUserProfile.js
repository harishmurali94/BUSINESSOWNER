import Api from "app/api";
import ApiConstants from "../ApiConstants";

export default function getAppliedUserProfile(data, token) {
  return Api(ApiConstants.USER_APPLIED_PROFILE, data, "post", token);
}
