import api from "../utils/api";
import * as types from "../constants/qna.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getQnaList = (query) => async (dispatch) => {
    try {
        dispatch({ type: types.QNA_GET_REQUEST });
        const res = await api.get("/qna/all");
        if (res.status !== 200) {
            throw new Error("QnA를 불러오는데 실패하였습니다.");
        } else {
            dispatch({
                type: types.QNA_GET_SUCCESS,
                payload: res.data.data.allQnA,
            });
        }
    } catch (error) {
        dispatch({ type: types.QNA_GET_FAIL, payload: error.message });
    }
};

const getQnaDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_QNA_DETAIL_REQUEST });
        const res = await api.get(`/qna/${id}`);
        if (res.status !== 200) {
            throw new Error("QnA를 불러오는데 실패하였습니다.");
        } else {
            dispatch({
                type: types.GET_QNA_DETAIL_SUCCESS,
                payload: res.data.data.qna,
            });
        }
    } catch (error) {
        dispatch({ type: types.GET_QNA_DETAIL_FAIL, payload: error.message });
    }
};

const createQna = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: types.QNA_CREATE_REQUEST });
        const { title, content } = formData;
        const res = await api.post(`/qna`, { title, content });

        if (res.status !== 200) {
            throw new Error("질문 등록에 실패하였습니다.");
        } else {
            dispatch({
                type: types.QNA_CREATE_SUCCESS,
                payload: res.data.data.newQnA._id,
            });
            navigate(`/qna/${res.data.data.newQnA._id}`)
        }
    } catch (error) {
        dispatch({ type: types.QNA_CREATE_FAIL, payload: error.message });
    }
};

const deleteQna = (id, searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: types.QNA_DELETE_REQUEST });
        const res = await api.delete(`/qna/${id}`);

        if (res.status !== 200) {
            throw new Error("질문 삭제에 실패하였습니다.");
        } else {
            dispatch({ type: types.QNA_DELETE_SUCCESS });
            dispatch(getQnaList(id))
        }
    } catch (error) {
        dispatch({ type: types.QNA_DELETE_FAIL });
    }
};

const updateQna = (formData, id, navigate) => async (dispatch) => {
    try {
        const { title, content } = formData;
        dispatch({ type: types.QNA_ANSWER_UPDATE_REQUEST });
        const res = await api.put(`/qna/${id}`, { title, content });

        if (res.status !== 200) {
            throw new Error("질문 수정에 실패하였습니다.");
        } else {
            dispatch({ type: types.QNA_ANSWER_UPDATE_SUCCESS });
            navigate(`/qna/${id}`)
        }
    } catch (error) {
        dispatch({
            type: types.QNA_ANSWER_UPDATE_FAIL,
            payload: error.message,
        });
    }
};

const createAnswer = (content, imageUrl, id) => async (dispatch) => {
    try {
        dispatch({ type: types.QNA_ANSWER_CREATE_REQUEST });
        const res = await api.post("/qna/answer", {
            qnaId: id,
            content,
            image: imageUrl,
        });

        if (res.status !== 200) {
            throw new Error("답변 달기에 실패하였습니다.");
        } else {
            dispatch({
                type: types.QNA_ANSWER_CREATE_SUCCESS,
                payload: res.data.data.newAnswer,
            });
            dispatch(getQnaDetail(id))
        }
    } catch (error) {
        dispatch({
            type: types.QNA_ANSWER_CREATE_FAIL,
            payload: error.message,
        });
    }
};

const deleteAnswer = (questionId, answerId) => async (dispatch) => {
    try {
        dispatch({ type: types.QNA_ANSWER_DELETE_REQUEST });
        const res = await api.delete(`/qna/${questionId}/answer/${answerId}`);
        if (res.status !== 200) {
            throw new Error("답변 삭제에 실패하였습니다.");
        } else {
            dispatch({ type: types.QNA_ANSWER_DELETE_SUCCESS });
            dispatch(getQnaDetail(questionId))
        }
    } catch (error) {
        dispatch({
            type: types.QNA_ANSWER_DELETE_FAIL,
            payload: error.message,
        });
    }
};

const updateAnswer = (questionId, answerId, content) => async (dispatch) => {
    try {
        dispatch({ type: types.QNA_ANSWER_UPDATE_REQUEST });
        const res = await api.put(`/qna/${questionId}/answer/${answerId}`, {
            content
        });
        if (res.status !== 200) {
            throw new Error("답변 수정에 실패하였습니다.");
        } else {
            dispatch({ type: types.QNA_ANSWER_UPDATE_SUCCESS });
            dispatch(getQnaDetail(questionId))
        }
    } catch (error) {
        dispatch({
            type: types.QNA_ANSWER_UPDATE_FAIL,
            payload: error.message,
        });
    }
};

const addLikeAnswer = (questionId, answerId) => async (dispatch) => {
    try {
        dispatch({ type: types.QNA_ANSWER_ADDLIKE_REQUEST });

        const res = await api.post(
            `/qna/${questionId}/answer/${answerId}/like`
        );

        if (res.status !== 200) {
            throw new Error("QnA를 불러오는데 실패하였습니다.");
        } else {
            dispatch({ type: types.QNA_ANSWER_ADDLIKE_SUCCESS });
            dispatch(getQnaDetail(questionId))
        }
    } catch (error) {
        dispatch({
            type: types.QNA_ANSWER_ADDLIKE_FAIL,
            payload: error.message,
        });
    }
};

export const qnaActions = {
    getQnaList,
    createQna,
    deleteQna,
    updateQna,
    getQnaDetail,
    createAnswer,
    deleteAnswer,
    addLikeAnswer,
    updateAnswer,
};
