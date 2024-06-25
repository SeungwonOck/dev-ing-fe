import * as types from "../constants/qna.constants";
const initialState = {
    loading: false,
    error: "",
    qnaList: [],
    selectedQnA: null,
    newQnaId: "",
};

function qnaReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case types.QNA_CREATE_REQUEST:
        case types.QNA_GET_REQUEST:
        case types.GET_QNA_DETAIL_REQUEST:
        case types.QNA_ANSWER_DELETE_REQUEST:
        case types.QNA_ANSWER_ADDLIKE_REQUEST:
            return { ...state, loading: true };

        case types.QNA_CREATE_SUCCESS:
            return { ...state, loading: false, error: "", newQnaId: payload };

        case types.QNA_ANSWER_CREATE_SUCCESS:
        case types.QNA_ANSWER_DELETE_SUCCESS:
        case types.QNA_ANSWER_ADDLIKE_SUCCESS:
            return { ...state, loading: false, error: "" };

        case types.QNA_GET_SUCCESS:
            return { ...state, loading: false, qnaList: payload };

        case types.QNA_CREATE_FAIL:
        case types.QNA_GET_FAIL:
        case types.QNA_ANSWER_CREATE_FAIL:
        case types.QNA_ANSWER_DELETE_FAIL:
        case types.QNA_ANSWER_ADDLIKE_FAIL:
            return { ...state, loading: false, error: payload };

        case types.GET_QNA_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                selectedQna: payload,
            };

        default:
            return state;
    }
}

export default qnaReducer;
