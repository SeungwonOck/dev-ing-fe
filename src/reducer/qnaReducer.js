import * as types from "../constants/qna.constants";
const initialState = {
  loading: false,
  error: '',
  qnaList: []
};

function qnaReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case types.QNA_CREATE_REQUEST:
    case types.QNA_GET_REQUEST:
        return {...state, loading: true}

    case types.QNA_CREATE_SUCCESS:
        return {...state, loading: false, error: ''}

    case types.QNA_GET_SUCCESS:
        return {...state, loading: false, qnaList:payload}

    case types.QNA_CREATE_FAIL:
    case types.QNA_GET_FAIL:
        return {...state, loading: false, error:payload}

    default:
        return state;
  }
}

export default qnaReducer;
