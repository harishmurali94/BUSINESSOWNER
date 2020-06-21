/* App config for apis
 */
const ApiConstants = {
  // BASE_URL: "http://119.82.97.221/ATJ",
  BASE_URL:'https://www.uetracksg.com/AnytimeOT/API',
  GET_OTP: "/api/Login/getOTPbyPhone",
  VERIFY_OTP: "/api/Login/verifyOTP",
  GET_JOB_TYPE: "/api/BussinessOwner/getJobTypes",
  GET_WORKING_DAYS: "/api/BussinessOwner/getWorkingDays",
  GET_SALARY_TYPES: "/api/BussinessOwner/getSalaryTypes",
  GET_QUALIFICATIONS: "/api/BussinessOwner/getQualification",
  GET_EXPERIENCE: "/api/BussinessOwner/getExperience",
  GET_AGE: "/api/BussinessOwner/getAge",
  GET_TOKEN: "/token",
  CREATE_PROFILE: "/api/BussinessOwner/createBOProfile",
  SAVE_JOBS: "/api/BussinessOwner/saveJobs",
  CREATE_JOBS: "/api/BussinessOwner/getCreatedJob",
  GET_JOB_POSTED: "/api/BussinessOwner/getCreatedJob",
  GET_JOB_DETAILS: "/api/BussinessOwner/getBOJobDetails",
  GET_APPLIED_USER_JOB: "/api/BussinessOwner/getAppliedUserbyJob",
  GET_HIRE_JOB:"/api/BussinessOwner/hireJSforJob",
  USER_APPLIED_PROFILE:"/api/JobSeeker/jsuserProfile",
  REJECT_USER:"/api/BussinessOwner/RejectJS",
  QR_CODE:"/api/JobSeeker/scanJobQRCode"
};

export default ApiConstants;
