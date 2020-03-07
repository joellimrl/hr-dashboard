import { put, call } from "redux-saga/effects";
import { postNotificationToken } from "../middleware";

export function* postNotificationTokenSaga(action) {
  try {
    const response = yield call(postNotificationToken, action.body);

    if (response.data.success) {
      yield put({ type: "POST_NOTIFICATION_TOKEN_SUCCESS" });
    } else {
      yield put({
        type: "POST_NOTIFICATION_TOKEN_FAIL",
        message: response.data.message
      });
    }
  } catch (error) {
    console.log(error);
  }
}
