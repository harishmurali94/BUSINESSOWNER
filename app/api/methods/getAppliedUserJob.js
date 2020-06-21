// /api/BussinessOwner/getCreatedJob

import Api from "app/api";
import ApiConstants from "../ApiConstants";

export default function getAppliedUserJob(params, token) {
  return Api(ApiConstants.GET_APPLIED_USER_JOB, params, "post", token);
}
