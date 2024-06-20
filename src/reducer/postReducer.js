import * as types from "../constants/post.constants";
const initialState = {
  loading: false,
  error: '',
  postList: [],
  selectedPost: null
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case types.POST_CREATE_REQUEST:
    case types.POST_GET_REQUEST:
    case types.GET_POST_DETAIL_REQUEST:
        return {...state, loading: true}

    case types.POST_CREATE_SUCCESS:
      return {...state, loading: false, error: ''}
      
    case types.GET_POST_DETAIL_SUCCESS:
      return {...state, loading: false, selectedPost:payload, error: ''}

    case types.POST_GET_SUCCESS:
        return {...state, loading: false, postList:payload}

    case types.POST_CREATE_FAIL:
    case types.POST_GET_FAIL:
    case types.GET_POST_DETAIL_FAIL:
        return {...state, loading: false, error:payload}

    default:
        return state;
  }
}

export default postReducer;