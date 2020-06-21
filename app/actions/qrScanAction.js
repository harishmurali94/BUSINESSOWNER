import * as types from "./types";

export function qrScanRequest(params) {
  return {
    type: types.QR_CODE_REQUEST,
    params
  };
}

export function qrScanResponse(status) {
  return {
    type: types.QR_CODE_RESPONSE,
    status
  };
}

export function qrScanFailed(status) {
  return {
    type: types.QR_CODE_FAILED,
    status
  };
}


