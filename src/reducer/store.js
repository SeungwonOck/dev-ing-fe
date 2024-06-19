import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import meetUpReducer from "./meetUpReducer";
import qnaReducer from "./qnaReducer";
import commonUiReducer from "./commonUIReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    meetUp: meetUpReducer,
    qna: qnaReducer,
    ui: commonUiReducer,
  },
});
export default store;