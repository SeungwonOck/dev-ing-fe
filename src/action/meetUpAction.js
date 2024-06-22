import api from "../utils/api";
import * as types from "../constants/meetUp.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getMeetUpList = (query) => async (dispatch) => {
    try {
        dispatch({ type: types.MEETUP_GET_REQUEST })
        const res = await api.get(`/meetup/all`);
        console.log("getMeetUpList res", res);
        if (res.status !== 200) {
            throw new Error('모임들을 불러오는데 실패하였습니다.')
        } else {
            dispatch({ type: types.MEETUP_GET_SUCCESS, payload: res.data.data.allMeetUp })
        }
    } catch (error) {
        dispatch({ type: types.MEETUP_GET_FAIL, payload: error.message })
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const getMeetUpDetail = (id) => async (dispatch) => {
    try {

    } catch (error) {

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
            navigate(`/post/${res.data.data.newMeetUp._id}`);
        }
    } catch (error) {
        dispatch({ type: types.MEETUP_CREATE_FAIL, payload: error.message })
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const deleteMeetUp = (id, searchQuery) => async (dispatch) => {
    try {

    } catch (error) {

    }
};

const updateMeetUp = (formData, id, searchQuery) => async (dispatch) => {
    try {

    } catch (error) {

    }
};

export const meetUpActions = {
    getMeetUpList,
    createMeetUp,
    deleteMeetUp,
    updateMeetUp,
    getMeetUpDetail,
};
