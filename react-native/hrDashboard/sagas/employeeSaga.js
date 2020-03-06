import { put, call } from "redux-saga/effects";
import { getEmployees, getEmployeeDetails, postEmployee } from "../middleware";

export function* getEmployeesSaga() {
  try {
    const response = yield call(getEmployees);

    if (response.data) {
      yield put({ type: "EMPLOYEE_LIST_SUCCESS", body: response.data });
    } else {
      yield put({
        type: "EMPLOYEE_LIST_FAIL"
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getEmployeeDetailsSaga(action) {
  try {
    const { employeeId } = action;

    const response = yield call(getEmployeeDetails, employeeId);

    if (response.data) {
      yield put({ type: "EMPLOYEE_DETAILS_SUCCESS", body: response.data });
    } else {
      yield put({
        type: "EMPLOYEE_DETAILS_FAIL"
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* postEmployeeSaga(action) {
  try {
    const { username, password } = action.body;

    const publicKeyResponse = yield call(postEmployee);

    if (publicKeyResponse.ok) {
      const { data: publicKey } = publicKeyResponse;
      const encryptedPassword = encrypt({ password, publicKey });

      const response = yield call(login, {
        username,
        password: encryptedPassword
      });

      if (response.data.success) {
        yield put({ type: "LOGIN_SUCCESS" });
      }
      yield put({
        type: "LOGIN_FAIL",
        message: response.data.message
      });
    }
  } catch (error) {
    console.log(error);
  }
}
