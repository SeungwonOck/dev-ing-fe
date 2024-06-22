import * as types from "../constants/meetUp.constants";
const initialState = {
  loading: false,
  error: '',
  meetUpList: [],
  selectedMeetUp: null
};

function meetUpReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.MEETUP_CREATE_REQUEST:
    case types.MEETUP_GET_REQUEST:
    case types.GET_MEETUP_DETAIL_REQUEST:
      return { ...state, loading: true }

    case types.MEETUP_CREATE_SUCCESS:
      return { ...state, loading: false, error: '' }

    case types.MEETUP_GET_SUCCESS:
      return { ...state, loading: false, meetUpList: payload }

    case types.GET_MEETUP_DETAIL_SUCCESS:
      return { ...state, loading: false, selectedMeetUp: payload, error: "" }

    case types.MEETUP_CREATE_FAIL:
    case types.MEETUP_GET_FAIL:
    case types.GET_MEETUP_DETAIL_FAIL:
      return { ...state, loading: false, error: payload }

    default:
      return state;
  }
}

export default meetUpReducer;
