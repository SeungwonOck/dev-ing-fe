import api from "../utils/api";
import * as types from "../constants/meetUp.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getMeetUpList = (query) => async (dispatch) => {
    try {
        dispatch({ type: types.MEETUP_GET_REQUEST })
        const res = await api.get(`/meetup/all`);
        if (res.status !== 200) {
            throw new Error('모임들을 불러오는데 실패하였습니다.')
        } else {
            dispatch({ type: types.MEETUP_GET_SUCCESS, payload: res.data.data.allMeetUp });
        }
    } catch (error) {
        dispatch({ type: types.MEETUP_GET_FAIL, payload: error.message });
        // dispatch(commonUiActions.showToastMessage(error.message, "error"));
    }
};

const getMeetUpDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_MEETUP_DETAIL_REQUEST });
        const res = await api.get(`/meetup/${id}`);
        if (res.status !== 200) {
            throw new Error('모임 정보를 불러오는데 실패하였습니다.')
        } else {
            dispatch({ type: types.GET_MEETUP_DETAIL_SUCCESS, payload: res.data.data.meetUp });
        }

    } catch (error) {
        dispatch({ type: types.GET_MEETUP_DETAIL_FAIL, payload: error.message })
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const createMeetUp = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: types.MEETUP_CREATE_REQUEST });
        const res = await api.post('/meetup', formData);
        if (res.status !== 200) {
            throw new Error('새 모임 등록에 실패하였습니다. 다시 시도해주세요.')
        } else {
            dispatch({ type: types.MEETUP_CREATE_SUCCESS, payload: res.data.data });;
            dispatch(commonUiActions.showToastMessage("새 모임이 등록되었습니다.", "success"));
            navigate(`/meetUp/${res.data.data.newMeetUp._id}`);
        }
    } catch (error) {
        dispatch({ type: types.MEETUP_CREATE_FAIL, payload: error.message });
        dispatch(commonUiActions.showToastMessage(error.message, "error"));
    }
};

const deleteMeetUp = (id, navigate) => async (dispatch) => {
    try {
        dispatch({ type: types.MEETUP_DELETE_REQUEST });
        const res = await api.delete(`/meetup/${id}`);
        if (res.status !== 200) {
            throw new Error('모임 삭제에 실패하였습니다.')
        } else {
            dispatch({ type: types.MEETUP_DELETE_SUCCESS });
            dispatch(commonUiActions.showToastMessage("모임을 삭제하였습니다.", "success"));
            navigate(`/meetup`);
        }

    } catch (error) {
        dispatch({ type: types.MEETUP_DELETE_FAIL, payload: error.message })
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const updateMeetUp = (formData, id, navigate) => async (dispatch) => {
    try {
        dispatch({ type: types.MEETUP_EDIT_REQUEST });
        const res = await api.put(`/meetup/${id}`, formData);
        if (res.status !== 200) {
            throw new Error('포스트 수정에 실패하였습니다.')
        } else {
            dispatch({ type: types.MEETUP_EDIT_SUCCESS })
            dispatch(commonUiActions.showToastMessage("모임 정보가 수정되었습니다.", "success"))
            navigate(`/meetUp/${id}`)
        }
    } catch (error) {
        dispatch({ type: types.MEETUP_EDIT_FAIL, payload: error.message })
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const joinMeetUp = (id, navigate) => async (dispatch) => {
    try {
        dispatch({ type: types.JOIN_MEETUP_REQUEST });
        const res = await api.post(`/meetup/join`, { meetUpId: id });
        console.log("joinMeetUp res", res);
        if (res.status !== 200) {
            throw new Error('모임 참여에 실패하였습니다.')
        } else {
            dispatch({ type: types.JOIN_MEETUP_SUCCESS, payload: res.data.data.meetUp });
            dispatch(commonUiActions.showToastMessage("모임 참여에 성공했습니다.", "success"));
            navigate(`/meetup/${id}`);
        }
    } catch (error) {
        dispatch({ type: types.JOIN_MEETUP_FAIL, payload: error.message });
        dispatch(commonUiActions.showToastMessage(error.message, "error"));
    }
}

const leaveMeetUp = (id, navigate) => async (dispatch) => {
    try {
        dispatch({ type: types.LEAVE_MEETUP_REQUEST });
        const res = await api.post(`/meetup/leave`, { meetUpId: id });
        console.log("joinMeetUp res", res);
        if (res.status !== 200) {
            throw new Error('모임 참여 취소에 실패하였습니다.')
        } else {
            dispatch({ type: types.LEAVE_MEETUP_SUCCESS, payload: res.data.data.meetUp });
            dispatch(commonUiActions.showToastMessage("모임 참여 취소에 성공했습니다.", "success"));
            navigate(`/meetup/${id}`);
        }
    } catch (error) {
        dispatch({ type: types.LEAVE_MEETUP_FAIL, payload: error.message });
        dispatch(commonUiActions.showToastMessage(error.message, "error"));
    }
}

export const meetUpActions = {
    getMeetUpList,
    createMeetUp,
    deleteMeetUp,
    updateMeetUp,
    getMeetUpDetail,
    joinMeetUp,
    leaveMeetUp
};
