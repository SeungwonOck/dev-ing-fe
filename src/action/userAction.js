import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.TOKEN_LOGIN_REQUEST })
    const res = await api.get('/user');
    if (res.status !== 200) {
      throw new Error('Invalid token');
    }
    else {
      dispatch({ type: types.TOKEN_LOGIN_SUCCESS, payload: res.data })
    }

  } catch (error) {
    dispatch({ type: types.TOKEN_LOGIN_FAIL, payload: error.message })
    dispatch(logout())
  }
};

const clearError = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERROR });
};

const loginWithEmail = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST })
    const res = await api.post('/auth/login', { email, password })
    console.log("loginWithEmail response", res);
    if (res.status !== 200) {
      throw new Error(res.error)
    }
    else {
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data })
      sessionStorage.setItem('token', res.data.token)
      dispatch(commonUiActions.showToastMessage(`${res.data.user.userName}님 환영합니다`, "success"))
    }

  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.message })
  }
};

const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });
  sessionStorage.removeItem('token');
};

const loginWithGoogle = (token) => async (dispatch) => {
};

const register = ({ email, userName, password }, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST })
    const res = await api.post('/user', { email, userName, password })
    console.log("register response", res);
    if (res.status !== 200) {
      throw new Error(res.error)
    }
    else {
      dispatch({ type: types.REGISTER_SUCCESS })
      dispatch(commonUiActions.showToastMessage("회원가입을 완료했습니다.", "success"))
      navigate('/login')
    }

  } catch (error) {
    dispatch({ type: types.REGISTER_FAIL, payload: error.message })
  }
};

const loginWithGithub = () => async (dispatch) => { };
const loginWithFacebook = () => async (dispatch) => { };


export const userActions = {
  loginWithToken,
  loginWithEmail,
  loginWithGoogle,
  loginWithGithub,
  loginWithFacebook,
  logout,
  register,
  clearError
};
