import * as types from "../constants/report.constants";
const initialState = {
    loading: false,
    error: '',
    reportList: []
};

function reportReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_REPORT_REQUEST:
    case types.GET_ALL_REPORT_REQUEST:
      return { ...state, loading: true }

    case types.CREATE_REPORT_SUCCESS:
      return { ...state, loading: false, error: ''}

    case types.GET_ALL_REPORT_SUCCESS:
        return { ...state, loading: false, reportList: payload }
    case types.CREATE_REPORT_FAIL:
    case types.GET_ALL_REPORT_FAIL:
      return { ...state, loading: false, error: payload }

    default:
      return state;
  }
}

export default reportReducer;

