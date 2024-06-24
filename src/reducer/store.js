import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import meetUpReducer from "./meetUpReducer";
import qnaReducer from "./qnaReducer";
import commonUiReducer from "./commonUIReducer";
import homeReducer from "./homeReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    meetUp: meetUpReducer,
    qna: qnaReducer,
    home: homeReducer,
    ui: commonUiReducer,
  },
});
export default store;