import api from "../utils/api";
import * as types from "../constants/post.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getPostList = (query) => async (dispatch) => {
    try {
        dispatch({type: types.POST_GET_REQUEST})
        const res = await api.get(`/post/all`);
        if(res.status !== 200) {
            throw new Error('글을 불러오는데 실패하였습니다.')
        } else {
            dispatch({type: types.POST_GET_SUCCESS, payload: res.data.data.allPost})
        }
    } catch (error) {
        dispatch({type: types.POST_GET_FAIL, payload: error.message})
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const getPostDetail = (id) => async (dispatch) => {
    try {
        dispatch({type: types.GET_POST_DETAIL_REQUEST})
        const res = await api.get(`/post/${id}`);
        if(res.status !== 200) {
            throw new Error('글을 불러오는데 실패하였습니다.')
        } else {
            dispatch({type: types.GET_POST_DETAIL_SUCCESS, payload: res.data.data.post})
        }
    } catch (error) {
        dispatch({type: types.GET_POST_DETAIL_FAIL, payload: error.message})
        dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const createPost = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({type: types.POST_CREATE_REQUEST})
        const res = await api.post('/post', formData);
        if(res.status !== 200) {
            throw new Error('새 글 등록에 실패하였습니다. 다시 시도해주세요.')
        } else {
            dispatch({type: types.POST_CREATE_SUCCESS, payload: res.data.data})
            dispatch(commonUiActions.showToastMessage("새 글이 등록되었습니다.", "success"))
            navigate(`/post/${res.data.data._id}`)
        }
    } catch (error) {
        dispatch({type: types.POST_CREATE_FAIL, payload: error.message})
        // dispatch(commonUiActions.showToastMessage(error.message, "error"))
    }
};

const deletePost = (id, searchQuery) => async (dispatch) => {
    try {
        
    } catch (error) {
        
    }
};

const editPost = (formData, id, searchQuery) => async (dispatch) => {
    try {
        
    } catch (error) {
        
    }
};

export const postActions = {
  getPostList,
  createPost,
  deletePost,
  editPost,
  getPostDetail,
};
